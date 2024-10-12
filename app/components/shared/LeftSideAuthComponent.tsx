import Link from "next/link";

const LeftSideAuthComponent = () => {
    return (
        <div className='hidden lg:block lg:w-[42%] p-3 2xl:p-5'>
            <div className='relative bg-textBlack h-full w-full rounded-2xl lg:rounded-3xl'>
                <img src="/assets/auth/Rectangle.png" alt="left side " className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl" />
                <img src="/assets/auth/dots-dots.png" alt="left side " className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl" />
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-between rounded-2xl lg:rounded-3xl p-12 2xl:p-14'>
                    <Link href={'/'} className='flex items-center gap-3'>
                        <img src="/assets/logo.png" alt="" className="size-10" />
                        <h2 className="text-white text-xl 2xl:text-3xl font-medium">Flat Share</h2>
                    </Link>
                    <div className=''>
                        <h1 className="font-bold text-4xl 2xl:text-5xl text-white mr-10">Find Your Perfect Space, Share Your Perfect Moments!</h1>
                        <p className="pt-4 2xl:pt-8 text-[#F5F5F5] 2xl:text-lg">Welcome to our flat-sharing community! Whether you’re a student, young professional, or digital nomad, we’ve got the ideal space waiting for you. Discover shared apartments, cozy rooms, and friendly flatmates. It’s more than just a place to stay—it’s where memories are made.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideAuthComponent;