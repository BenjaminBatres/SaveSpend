export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-[#cafbe7] rounded-lg h-6 sm:h-7 overflow-hidden mb-2 relative">
      <div
        className={`bg-[#00bf91] h-6 sm:h-7 transition-all duration-500  ${value === 0 ? 'border-r-0' : 'border-r'}`}
        style={{ width: `${value}%` }}
      />
      <div 
      style={{marginLeft: value <= 4 ? value + '.5%' : '8px', left: value + '%'}}
      className={`absolute top-0.5 sm:top-1`}>{(value).toFixed(0)}%</div>
      
    </div>
  );
}
