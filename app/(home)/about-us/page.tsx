import Image from "next/image";
import img01 from "@/app/assets/about01.png";
import img03 from "@/app/assets/about03.png";
import Testimonials from "@/app/components/ui/HomePage/Testimonials";

function AboutUs() {
  return (
    <div className="container mx-auto min-h-screen">
      <p className="text-4xl text-center font-bold">
        Welcome to FoundIt Online
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 lg:mx-0 items-center mt-8">
        <div className="text-lg">
          <h4 className="text-3xl font-bold my-5">Our Mission</h4>
          <p>
            At <span className="font-bold">FoundIt Online</span>, our mission is
            to foster a community spirit where individuals come together to help
            each other. We aim to:
          </p>
          <p className="my-2">
            <span className="font-bold">Facilitate Reunions:</span> Provide a
            user-friendly platform for reporting lost and found items.
          </p>
          <p>
            <span className="font-bold">Ensure Security:</span>Implement robust
            verification processes to ensure that items are returned to their
            rightful owners.
          </p>
        </div>
        <Image src={img01} alt="about" width={400} height={300} />
      </div>
      <Testimonials />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 lg:mx-0 items-center mt-8">
        <Image src={img03} alt="about" width={400} height={300} />
        <div className="text-lg">
          <h4 className="text-3xl font-bold my-5">Join Us</h4>
          <p>
            Become a part of the{" "}
            <span className="font-bold">FoundIt Online</span> community today.
            Whether you&apos;re reporting a lost item or helping someone reunite
            with theirs, every effort counts.
          </p>
          <p className="my-2">
            Together, we can make a difference, one lost item at a time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
