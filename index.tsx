import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from '@google/genai';

const App = () => {
  const [simulationLog, setSimulationLog] = useState(
    '<p class="placeholder">Simulation log will appear here... The quantum realm awaits your command.</p>'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateKey = async () => {
    setIsLoading(true);
    setError('');
    setSimulationLog('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        Simulate and narrate a Quantum Key Distribution (QKD) exchange using the BB84 protocol between Alice and Bob.
        Your narration should be engaging and clear for a non-expert.
        1.  Start by describing Alice sending a stream of 20 photons with random polarizations (0, 45, 90, 135 degrees).
        2.  Describe Bob measuring these photons with a random basis (rectilinear [+] or diagonal [x]) for each photon.
        3.  Show the comparison where Alice and Bob publicly share their basis choices and discard the mismatched results. This is the 'sifting' phase.
        4.  Randomly decide if an eavesdropper, Eve, was present.
        5.  If Eve is present, explain that her measurements disturbed the photons, creating a high Quantum Bit Error Rate (QBER) when Alice and Bob compare a sample of their sifted keys. Conclude that they must discard the key and restart.
        6.  If Eve is not present, confirm the QBER is low, and show the final, short, secure key they have established.
        7.  Format the output as a step-by-step log. Use simple language.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setSimulationLog(response.text);

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to establish quantum link. Error: ${errorMessage}`);
      setSimulationLog(`<p class="error">Connection to the quantum realm failed. Please try again.</p>`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header>
        <h1>QuantumGuard Auth</h1>
      </header>
      <main className="container">
        <section className="hero">
          <h2>Unbreakable Authentication, Powered by Quantum Physics.</h2>
          <p>
            Welcome to the future of security. Quantum Key Distribution (QKD)
            leverages the fundamental principles of quantum mechanics to create
            provably secure communication channels, immune to the threats of
            even the most powerful computers.
          </p>
        </section>

        <section className="qkd-demo" aria-labelledby="demo-heading">
          <h2 id="demo-heading">Interactive QKD Simulation</h2>
          <p>
            Witness the power of quantum security firsthand. Click the button below
            to simulate a secure key exchange between two parties, "Alice" and
            "Bob". Our AI will narrate the process, including how any attempt at
            eavesdropping is instantly detected.
          </p>
          <button onClick={handleGenerateKey} disabled={isLoading}>
            {isLoading ? 'Establishing Quantum Link...' : 'Initiate Secure Key Exchange'}
          </button>
          <div
            className="simulation-log"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: isLoading ? '<p class="loading-indicator">Transmitting photons...</p>' : simulationLog }}
          />
           {error && <p className="error" role="alert">{error}</p>}
        </section>

        <section aria-labelledby="how-it-works-heading">
          <h2 id="how-it-works-heading">How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Photon Transmission</h3>
              <p>Alice sends a stream of photons, each encoded with a random quantum state (polarization).</p>
            </div>
            <div className="step">
              <h3>2. Measurement</h3>
              <p>Bob measures the incoming photons using a random sequence of measurement bases.</p>
            </div>
            <div className="step">
              <h3>3. Key Sifting</h3>
              <p>Alice and Bob publicly compare their bases and discard any measurements where their bases didn't match.</p>
            </div>
            <div className="step">
              <h3>4. Eavesdropper Detection</h3>
              <p>The laws of physics dictate that any eavesdropper attempting to measure the photons will disturb their state, which Alice and Bob can detect.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="benefits-heading">
            <h2 id="benefits-heading">Key Benefits</h2>
            <div className="benefits-grid">
                <div className="benefit-card">
                    <h3>Future-Proof</h3>
                    <p>Secure against attacks from both classical and future quantum computers.</p>
                </div>
                <div className="benefit-card">
                    <h3>Tamper-Evident</h3>
                    <p>Instantly detects eavesdropping attempts. The very act of observing the key exchange alters it.</p>
                </div>
                <div className="benefit-card">
                    <h3>Provably Secure</h3>
                    <p>Security is guaranteed by the fundamental laws of physics, not just mathematical complexity.</p>
                </div>
            </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 QuantumGuard Auth. Securing the future, one photon at a time.</p>
      </footer>
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
