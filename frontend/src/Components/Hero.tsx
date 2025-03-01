
export const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row border border-gray-400 font-serif">
        <div className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-0">
            <div className="text-[#414141]">
                <div className="flex items-center gap-2">
                    <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                    <p className="font-medium text-sm md:text-base">Our BESTSELLERS</p>
                </div>
                <p className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</p>
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm md:text-base">shop now</p>
                    <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                </div>
            </div>
        </div>
        <img src="\frontend_assets\hero_img.png" alt="Forever logo" className="Logo  md:w-1/2"/>
    </div>
  )
}
