export  const CalcularHoraFuncionamento = (medicaoAtual: number, medicaoAnterior: number): number => { 
  if (!medicaoAtual) throw new Error('medição atual deve ser informado');
  if (!medicaoAnterior) throw new Error('medição anterior deve ser informado');
  if (medicaoAtual <= 0) throw new Error('medição atual deve ser maior que 0');
  if (medicaoAtual < medicaoAnterior) throw new Error('A medição atual deve ser maior que a medicao anterior');
  return +(medicaoAtual - medicaoAnterior).toFixed(2);
};