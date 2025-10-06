"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

export default function CalculatorPage() {
  // State for calculation
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Allows only digits and arithmetic operators
  function handleButtonClick(value: string) {
    setError(null);
    if (value === "C") {
      setInput("");
      setResult(null);
      setError(null);
      return;
    }
    if (value === "⌫") {
      setInput(input.slice(0, -1));
      return;
    }
    if (value === "=") {
      try {
        // eslint-disable-next-line no-eval
        // Intentionally safe: replace onto an allowed type
        // Remove leading 0s
        // Prevents code injection, supports basic arithmetic only
        // Disallow letters or characters outside of allowed
        const safeInput = input.replace(/[^0-9+\-*/.()]/g, "");
        if (!safeInput.match(/^[\d+\-*/().\s]+$/)) {
          setError("Invalid expression");
          setResult(null);
          return;
        }
        // Prevent consecutive operators except - (for negative)
        if (/[*+\-/]{2,}/.test(safeInput.replace(/--/g, ""))) {
          setError("Invalid operator sequence");
          setResult(null);
          return;
        }
        const evalResult = Function(`return (${safeInput})`)();
        if (typeof evalResult === "number" && isFinite(evalResult)) {
          setResult(evalResult.toString());
        } else {
          setError("Error");
          setResult(null);
        }
      } catch {
        setError("Error");
        setResult(null);
      }
      return;
    }
    if (value === "." && (input === "" || /[+\-*/(]$/.test(input))) {
      // Prevent leading decimal
      setInput(input + "0.");
    } else {
      setInput(input + value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (
      /[0-9+\-*/().]/.test(e.key) ||
      e.key === "Enter" ||
      e.key === "Backspace" ||
      e.key === "Escape"
    ) {
      if (e.key === "Enter") {
        handleButtonClick("=");
      } else if (e.key === "Backspace") {
        handleButtonClick("⌫");
      } else if (e.key === "Escape") {
        handleButtonClick("C");
      } else {
        handleButtonClick(e.key);
      }
      e.preventDefault();
    }
  }

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C", "⌫"]
  ];

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background ${theme === "dark" ? "dark" : ""} transition-colors duration-300`}>
      <header className="flex items-center justify-between gap-4 px-4 py-4 border-b bg-card shadow-sm">
        <h1 className="text-2xl font-bold">🧮 Calculator</h1>
        <Button onClick={toggleTheme} aria-label="Toggle theme" variant="ghost" size="icon">
          {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </Button>
      </header>
      <main className="flex flex-col w-full max-w-sm mx-auto flex-1 justify-center mt-8">
        <section className="bg-card rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 py-6 flex flex-col gap-2">
            <div className="text-right text-xl font-mono min-h-[28px] break-words select-all text-muted-foreground">
              {input || <span className="text-gray-400">0</span>}
            </div>
            <div className="text-right min-h-[28px] text-2xl font-bold font-mono py-1">
              {error ? <span className="text-destructive">{error}</span> : result ?? <span className="opacity-20">=</span>}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4">
            {buttons.flat().map((btn) => (
              <Button
                key={btn}
                variant={btn === "=" ? "default" : btn === "C" ? "destructive" : btn === "⌫" ? "secondary" : "outline"}
                size={btn === "=" ? "lg" : "default"}
                onClick={() => handleButtonClick(btn)}
                className={
                  btn === "=" ? "col-span-1 row-span-2 bg-primary text-white h-20" :
                  btn === "0" ? "col-span-1" :
                  btn === "C" ? "col-span-2" :
                  btn === "⌫" ? "col-span-2" :
                  ""
                }
                aria-label={btn}
              >
                {btn === "⌫" ? "⌫" : btn}
              </Button>
            ))}
          </div>
        </section>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground select-none">
        Made with <span className="text-lg">🧑‍💻</span> using Next.js, Shadcn UI &amp; Tailwind CSS
      </footer>
    </div>
  );
}
