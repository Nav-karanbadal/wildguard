import Hero from "../components/Hero/Hero"
import Mission from "../components/Mission/Mission"
import Impact from "../components/Impact/Impact"
import FeaturedWildlife from "../components/FeaturedWildlife/FeaturedWildlife"
import ProgramsPreview from "../components/ProgramsPreview/ProgramsPreview"
import BlogPreview from "../components/BlogPreview/BlogPreview"
import CallToAction from "../components/CallToAction/CallToAction"

function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Impact />
      <FeaturedWildlife />
      <ProgramsPreview />
      <BlogPreview />
      <CallToAction />
    </>
  )
}

export default Home