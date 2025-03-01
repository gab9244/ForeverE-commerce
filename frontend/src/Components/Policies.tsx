
export const Policies = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 ">
        <div className="justify-center">
            <img src="\frontend_assets\exchange_icon.png" alt="" className="w-12 m-auto mb-5 " />
            <p>Easy Exchange Policy</p>
            <p>We offer hassle free exchange policy</p>
        </div>
        <div>
            <img src="\frontend_assets\quality_icon.png" alt="" className=" w-12 m-auto mb-5" />
            <p>7 Days Return Policy</p>
            <p>We provide 7 days free return policy</p>
        </div>
        <div>
            <img src="\frontend_assets\support_img.png" alt="" className="w-12 m-auto mb-5"/>
            <p>Best customer support</p>
            <p>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}
