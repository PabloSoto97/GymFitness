interface CardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  image?: string; // ruta de imagen (opcional)
}

export const Card = ({ title, description, buttonText, image }: CardProps) => {
  return (
    <div className="relative flex w-80 flex-col justify-between rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-full">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl shadow-lg">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-blue-500 to-blue-600" />
        )}
      </div>

      <div className="flex-1 p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {title}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {description}
        </p>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <button
          type="button"
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
