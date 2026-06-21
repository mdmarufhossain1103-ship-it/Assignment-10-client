import Animation from "@/Components/HeroSection/Animation";
import CardSection from "@/Components/HeroSection/CardSection";


export default function Home() {
  return (
   <div>
    <div className="my-10">
        <Animation></Animation>
    </div>
    <div>
        <CardSection></CardSection>
    </div>
   </div>
  );
}
