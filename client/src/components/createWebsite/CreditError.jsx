const CreditError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-4 border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-3 rounded-lg text-sm">
      ⚠ {message}
    </div>
  );
};

export default CreditError;