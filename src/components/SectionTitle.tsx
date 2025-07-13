import { Separator } from './ui/separator';

type SectionTitleProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

function SectionTitle({ text, className = '', style }: SectionTitleProps) {
  return (
    <div
      className={`mb-16 flex flex-col items-center ${className}`}
      style={style}
    >
      <h2
        className={`text-4xl font-extrabold tracking-wider capitalize
                   bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500
                   bg-clip-text text-transparent select-none`}
        aria-label={text}
      >
        {text}
      </h2>
      <Separator className="w-24 mt-6 border-2 border-indigo-500 rounded-full animate-pulse" />
    </div>
  );
}

export default SectionTitle;
