interface ButtonProps {
  onHandleEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
}

const Button = ({ onHandleEvent, name }: ButtonProps) => {
  return (
    <button
      onClick={onHandleEvent}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign in
    </button>
  );
};

export default Button;
