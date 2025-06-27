/* eslint-disable react/no-unknown-property */
import React, { forwardRef, useRef, useMemo, useLayoutEffect, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// Helper function to convert hex color to normalized RGB
const hexToNormalizedRGB = (hex: string) => {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};

// Vertex Shader for the silk effect
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader for the silk effect
const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  uv -= 0.5; // Rotate around center
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  uv = rot * uv;
  return uv + 0.5; // Translate back
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv, uRotation); // Apply rotation
  uv               = (uv - 0.5) * uScale + 0.5; // Apply scale around center

  vec2  tex        = uv;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

// Interface for shader uniforms
interface SilkPlaneUniforms {
  uSpeed: { value: number };
  uScale: { value: number };
  uNoiseIntensity: { value: number };
  uColor: { value: Color };
  uRotation: { value: number };
  uTime: { value: number };
}

// Props for the SilkPlane component
interface SilkPlaneProps {
  uniforms: SilkPlaneUniforms;
}

/**
 * Renders a plane with the custom silk shader.
 * Uses forwardRef to allow accessing the mesh from the parent component.
 */
const SilkPlane = forwardRef<any, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  // Create the ShaderMaterial instance using useMemo for stability
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      depthWrite: false, // Prevents writing to the depth buffer for background effects
    });
  }, [uniforms]); // Re-create material only if uniforms object reference changes

  // Adjust plane scale to fill the viewport
  useLayoutEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  // Update uTime uniform for animation on each frame
  useFrame(() => {
    if (shaderMaterial && shaderMaterial.uniforms && shaderMaterial.uniforms.uTime) {
      shaderMaterial.uniforms.uTime.value += 0.1 * (1 / 60); // Assuming 60fps for consistent speed
    }
  });

  return (
    <mesh ref={ref} material={shaderMaterial}>
      <planeGeometry args={[1, 1, 1, 1]} />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

/**
 * Main Silk background component with Gemini API integration.
 * Allows generating new background styles dynamically.
 */
const SilkBackground: React.FC = () => {
  // State for dynamic background parameters
  const [speed, setSpeed] = useState<number>(5);
  const [scale, setScale] = useState<number>(1);
  const [color, setColor] = useState<string>("#7B7481");
  const [noiseIntensity, setNoiseIntensity] = useState<number>(1.5);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const meshRef = useRef();

  // Memoized uniforms object for the shader material
  const uniforms = useMemo<SilkPlaneUniforms>(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [speed, scale, color, noiseIntensity, rotation]
  );

  /**
   * Displays a message to the user for a short duration.
   * @param msg - The message to display.
   * @param duration - The duration in milliseconds to show the message.
   */
  const showMessage = useCallback((msg: string, duration: number = 3000) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage("");
    }, duration);
  }, []);

  /**
   * Calls the Gemini API to generate new background parameters.
   */
  const generateNewBackground = async () => {
    setIsLoading(true);
    showMessage("✨ Generating new background...", 5000); // Show loading message

    try {
      const prompt = `Generate a JSON object describing an abstract animated background.
      Include a 'mood' string (e.g., 'calm', 'energetic', 'mysterious', 'dreamy', 'vibrant', 'subtle').
      Provide numerical values for 'suggestedSpeed' (range 0.1-10.0),
      'suggestedScale' (range 0.5-5.0),
      'suggestedNoiseIntensity' (range 0.1-5.0),
      and 'suggestedRotation' (range 0.0-6.28, representing radians for a full circle).
      Also, provide a 'suggestedColor' in hexadecimal format (e.g., '#RRGGBB').
      Ensure the values create a visually appealing and distinct background effect.`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              mood: { type: "STRING" },
              suggestedSpeed: { type: "NUMBER" },
              suggestedScale: { type: "NUMBER" },
              suggestedColor: { type: "STRING" },
              suggestedNoiseIntensity: { type: "NUMBER" },
              suggestedRotation: { type: "NUMBER" }
            },
            required: ["mood", "suggestedSpeed", "suggestedScale", "suggestedColor", "suggestedNoiseIntensity", "suggestedRotation"]
          }
        }
      };

      const apiKey = ""; // API key is provided by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const jsonString = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(jsonString);

        // Update state with new background parameters
        setSpeed(parsedJson.suggestedSpeed);
        setScale(parsedJson.suggestedScale);
        setColor(parsedJson.suggestedColor);
        setNoiseIntensity(parsedJson.suggestedNoiseIntensity);
        setRotation(parsedJson.suggestedRotation);

        showMessage(`✨ New background: ${parsedJson.mood}!`, 3000);
      } else {
        throw new Error("Invalid response format from Gemini API.");
      }

    } catch (error) {
      console.error("Error generating background:", error);
      showMessage("Failed to generate background. Please try again.", 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Add the Inter font link using a useEffect hook to ensure it's loaded
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Three.js Canvas */}
      <Canvas dpr={[1, 2]} frameloop="always">
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>

      {/* Control UI on top of the background */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end p-4 z-10 pointer-events-none">
        <div className="bg-purple-800 bg-opacity-50 text-white px-4 py-2 rounded-lg mb-4 text-sm font-medium transition-opacity duration-300"
             style={{ opacity: message ? 1 : 0, pointerEvents: 'none' }}>
          {message}
        </div>
        <button
          onClick={generateNewBackground}
          disabled={isLoading}
          className="
            pointer-events-auto
            px-6 py-3 rounded-full
            bg-gradient-to-r from-purple-600 to-indigo-600
            text-white text-lg font-bold
            shadow-lg hover:shadow-xl transform hover:scale-105
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75
            flex items-center justify-center space-x-2
            mb-8
          "
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span>✨ Generate Background</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SilkBackground;
