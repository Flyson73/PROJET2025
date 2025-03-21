"use client";
import React from "react";

function MainComponent() {
  const [prompt, setPrompt] = useState(
    "Create a pentagonal-shaped avatar face in Christmas style with geometric angles, similar to the reference but with holiday elements like a santa hat, keeping the same dynamic structure and sharp edges. Add festive red and green accents while maintaining the original geometric style."
  );
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/integrations/dall-e-3/?prompt=${encodeURIComponent(prompt)}`
      );
      const data = await response.json();
      setImage(data.data[0]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8 font-roboto">
        AI Image Creator
      </h1>

      <div className="w-full max-w-xl flex flex-col gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="w-full p-3 rounded-lg bg-[#333333] text-white border border-gray-600 focus:outline-none focus:border-gray-400"
          name="prompt"
        />

        <button
          onClick={generateImage}
          disabled={loading || !prompt}
          className="w-full p-3 rounded-lg bg-[#333333] text-white hover:bg-[#444444] disabled:opacity-50 transition-colors"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {image && (
        <div className="mt-8">
          <img
            src={image}
            alt="AI generated artwork"
            className="max-w-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default MainComponent;