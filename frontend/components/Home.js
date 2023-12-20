import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
function Home() {
  const [encryptMessage, setEncryptMessage] = useState("");
  const [decryptMessage, setDecryptMessage] = useState("");
  const [copy, setCopy] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {}, [result]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopy("Copié");
    } catch (err) {
      console.error("Erreur de copie :", err);
      alert("Erreur de copie");
    }
  };
  const handleEncrypt = async () => {
    try {
      const url = "http://localhost:3000/cryptography";
      const response = await fetch(`${url}/encrypt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: encryptMessage }),
      });

      const message = await response.json();
      setResult(message.encryptedMessage);
      setCopy("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  const handleDecrypt = async () => {
    try {
      const url = "http://localhost:3000/cryptography";
      const response = await fetch(`${url}/decrypt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encryptedMessage: decryptMessage }),
      });
      const message = await response.json();
      setResult(message.decryptedMessage);
      setCopy("");
    } catch (error) {
      console.error("Erreur lors de décryptage:", error);
    }
  };

  return (
    <main className={styles.main}>
      {result && (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="flex items-center">{result}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleCopyClick}
            >
              Copier
            </button>
          </div>
          {copy && <p className="text-center italic text-red-400">{copy}</p>}
        </div>
      )}

      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label
            htmlFor="encryptMessage"
            className="text-lg font-bold block mb-2"
          >
            Message à encrypter
          </label>
          <textarea
            id="encryptMessage"
            className="w-full p-2 border border-gray-300 rounded"
            value={encryptMessage}
            onChange={(e) => setEncryptMessage(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleEncrypt}
        >
          Encrypter
        </button>

        <div className="mt-8">
          <label
            htmlFor="decryptMessage"
            className="text-lg font-bold block mb-2"
          >
            Message secret à décrypter
          </label>
          <textarea
            id="decryptMessage"
            className="w-full p-2 border border-gray-300 rounded"
            value={decryptMessage}
            onChange={(e) => setDecryptMessage(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleDecrypt}
        >
          Décrypter
        </button>
      </div>
    </main>
  );
}

export default Home;
