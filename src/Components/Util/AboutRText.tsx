interface text {
  header: string;
  paragraph: string;
}
export const AboutRText = ({ header, paragraph }: text) => {
  return (
    <div className=" border-b-2 md:border-r-2 p-10 md:p-16">
      <p className="font-medium mb-2">{header}</p>
      <p className="text-gray-800 text-sm">{paragraph}</p>
    </div>
  );
};
