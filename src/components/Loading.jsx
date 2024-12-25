import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1F1E24]">
      {/* Main loader animation */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          <div className="h-32 w-32 rounded-full border-t-4 border-b-4 border-blue-500/30"></div>
        </div>
        
        {/* Inner spinning ring */}
        <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
          <div className="h-24 w-24 m-4 rounded-full border-r-4 border-l-4 border-purple-500/40"></div>
        </div>
        
        {/* Center icon */}
        <Loader2 className="h-16 w-16 text-white animate-spin m-8" />
      </div>
      
      {/* Loading text */}
      <div className="mt-8 text-white/80 font-medium tracking-wider">
        <span className="inline-block animate-[pulse_1.5s_ease-in-out_infinite]">
          LOADING
        </span>
      </div>
    </div>
  );
};

export default Loading;