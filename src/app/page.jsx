"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { buildApiUrl } from "../../api";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Home() {
  const [input, setInput] = useState("");
  const [size, setSize] = useState(250);
  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(buildApiUrl("generate"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: input, size: 200 }),
    });
    if (response.ok) {
      const blob = await response.blob();
      setQrCode(URL.createObjectURL(blob));
    } else {
      console.error("Failed to generate QR code:", response.status);
    }
  };

  const handleDownload = async (e, format) => {
    try {
      const response = await fetch(qrCode);
      const blob = await response.blob();
      download("myqr.png", URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
    }
  };

  const download = (filename, content) => {
    var element = document.createElement("a");
    element.setAttribute("href", content);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  useEffect(() => {
    return () => {
      if (!qrCode) {
        setQrCode("/examples/exampleQR.png");
      }
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <form className="mt-4 flex items-center gap-x-4">
        <div className="flex flex-col">
          <Label htmlFor="url" className="mb-1">
            Your URL
          </Label>
          <div className="flex items-center">
            <Input
              type="text"
              id="url"
              placeholder="https://example.com"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="p-2 border-2 border-gray-400 rounded focus:outline-none focus:border-blue-500"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              className=" text-white font-bold py-2 px-4 rounded ml-2"
            >
              Create QR Code
            </Button>
          </div>
        </div>
      </form>

      <Slider
        className="mt-4 w-80"
        defaultValue={[size]}
        max={1000}
        min={200}
        step={10}
        onValueChange={(value) => setSize(value)}
      />
      <p className="mt-4">
        Size: {size} x {size} px
      </p>
      {qrCode && (
        <div className="flex flex-col place-items-center mt-4">
          <Image
            src={qrCode}
            alt="QR Code"
            width={parseInt(size)}
            height={parseInt(size)}
            priority={true}
          />
          <div className="mt-4">
            <Button onClick={(e) => handleDownload(e, "png")} className="mr-2">
              Download PNG
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
