'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [consulta, setConsulta] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/criarchamado')
      .then(async (res) => {
        const data = await res.json();
        console.log(data)
        setConsulta(data);
      })
      .catch((error) => {
        console.error('Erro na requisição:', error.message);
      });
  }, []);

  return (
    <>
      <div className="p-5">
        <h1>Todos os chamados virgens</h1>
        <pre>{JSON.stringify(consulta, null, 2)}</pre>
      </div>
    </>
  );
}
