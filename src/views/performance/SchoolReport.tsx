import React from 'react';

export default function SchoolReport() {
  return (
    <div className="px-16 py-10 bg-white">
      <div className="w-20 bg-gray-300 rounded-full">
        <img
          src="https://ur.ac.rw/IMG/jpg/logo_for_ur.jpg"
          alt="Institution logo"
          className="block w-full h-full rounded-full"
        />
      </div>
      <div className="mt-16 flex justify-between">
        <div className="provider">
          <h2 className="text-xl font-bold">MINISTRY OF DEFENCE</h2>
          <h2 className="text-lg font-semibold py-2 uppercase">Gako Military academy</h2>
          <h3 className="text-lg font-medium pb-2">Email: gako@mod.rw</h3>
          <h3 className="text-lg font-medium">Tel: +250 788 186 771</h3>
        </div>
        <div className="student">
          <h2 className="text-lg font-bold">KAMANZI Protais</h2>
          <h2 className="text-lg font-semibold py-2">RDF00917</h2>
          <h2 className="text-lg font-medium">Year 1 - Fallon cook</h2>
          <h2 className="text-lg font-medium py-2">Year 2021 - 2022</h2>
        </div>
      </div>
      <h1 className="text-center font-bold underline my-10 text-lg">SCHOOL REPORT</h1>
    </div>
  );
}
