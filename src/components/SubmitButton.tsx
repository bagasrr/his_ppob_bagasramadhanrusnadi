const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <div>
      <button
        type="submit"
        disabled={disabled}
        className="group relative flex w-full justify-center rounded-md bg-red-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-400 disabled:cursor-not-allowed"
      >
        {disabled ? "Loading..." : "Masuk"}
      </button>
    </div>
  );
};

export default SubmitButton;
