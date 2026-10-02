import { Link, useParams } from "react-router-dom"

import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import { getBlogs } from "../redux/blogSlice"


// Load all local blog images
const imageFiles = import.meta.glob(
  "../assets/images/blogs/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
)


// Create filename → image URL map
const blogImages = Object.entries(imageFiles).reduce(
  (images, [path, image]) => {
    const fileName = path.split("/").pop()

    images[fileName] = image

    return images
  },
  {}
)


// Fallback image
const fallbackImage = blogImages["blog-1.jpg"]


function BlogDetails() {

  const { id } = useParams()

  const dispatch = useDispatch()


  const {
    blogs,
    loading,
    error,
  } = useSelector((state) => state.blogs)


  // Load blog data from API
  useEffect(() => {

    if (blogs.length === 0) {
      dispatch(getBlogs())
    }

  }, [dispatch, blogs.length])


  /*
    Detailed content for all 15 API blog titles.
  */

  const blogContent = {


    "The Wildlife Conservation Society Blog": [

      "Wildlife conservation plays an important role in protecting biodiversity and maintaining healthy ecosystems. Across the world, many species face increasing pressure from habitat loss, environmental change and human activities.",

      "Conservation organizations work to understand these challenges through scientific research, field studies and wildlife monitoring. Information collected in the field can help researchers understand population changes and identify important habitats that need protection.",

      "Endangered species require particular attention because their populations may be small or declining. Protecting their habitats, reducing threats and supporting conservation programs can help create better conditions for their survival.",

      "Biodiversity conservation also benefits entire ecosystems. Every species has a role within its environment, and protecting a variety of species helps maintain ecological processes and natural balance.",

      "Conservation requires cooperation between researchers, governments, local communities and organizations. By combining scientific knowledge with practical conservation work, long-term protection of wildlife and biodiversity becomes possible.",

    ],


    "World Wildlife Fund (WWF) Blog": [

      "Wildlife conservation is closely connected to the health of the planet. Changes in climate, habitat destruction and unsustainable use of natural resources can affect wildlife populations as well as the ecosystems on which people depend.",

      "Climate change can alter temperatures, rainfall patterns, water availability and seasonal conditions. These changes may affect where animals can find food, reproduce and move between habitats.",

      "Protecting species also requires protecting the environments where they live. Forests, grasslands, wetlands, rivers and oceans all support different forms of biodiversity and provide important ecological services.",

      "Conservation programs can combine habitat protection, species monitoring, restoration projects and community participation. Sustainable practices can also help reduce pressure on natural resources.",

      "Long-term conservation depends on understanding the relationship between wildlife, climate and human activity. Cooperation across communities, organizations and governments can support efforts to protect species and ecosystems.",

    ],


    "Save Our Species Blog": [

      "Endangered species around the world face a variety of threats, including habitat loss, illegal wildlife trade, pollution and changes in environmental conditions. Protecting these species requires focused conservation efforts.",

      "Field research is an important part of species conservation. Researchers can study animal populations, habitats, behaviour and threats to better understand what actions may help a species recover.",

      "Funding also plays an important role in conservation. Financial support can help organizations conduct research, protect habitats, train conservation teams and implement programs in areas where species are at risk.",

      "Species recovery often requires long-term commitment. Conservation teams may need to monitor populations for many years to understand whether protection and restoration measures are producing positive changes.",

      "Protecting endangered species also protects the ecosystems in which they live. Conservation programs therefore contribute not only to individual species but also to wider biodiversity protection.",

    ],


    "The Nature Conservancy Blog": [

      "Healthy habitats are essential for wildlife and people. Forests, wetlands, rivers, grasslands and coastal ecosystems provide places where species can live while also supporting important environmental processes.",

      "Habitat protection can help prevent the fragmentation and degradation of natural landscapes. Maintaining connected habitats can make it easier for wildlife to move between areas and access food, water and breeding sites.",

      "Water protection is another important part of conservation. Rivers, lakes and wetlands support many species and provide essential resources for communities.",

      "Biodiversity conservation can also involve restoring damaged ecosystems. Restoration projects may include native vegetation, wetland recovery, habitat monitoring and improved management practices.",

      "Successful conservation often combines scientific research with local knowledge and community participation. Protecting habitats for the future requires continued cooperation and long-term planning.",

    ],


    "Earthwatch Blog": [

      "Citizen science provides an opportunity for people to participate directly in scientific research and environmental conservation. Volunteers can contribute observations, field measurements and other information that researchers can use in their studies.",

      "Wildlife research often requires information collected across large areas and over long periods. Community volunteers can help researchers gather observations that would otherwise require significant resources.",

      "Participating in conservation projects can also increase environmental awareness. People who take part in field activities may develop a better understanding of local wildlife, habitats and environmental challenges.",

      "Volunteer-based research can cover many topics, including wildlife populations, biodiversity, habitat conditions and environmental changes. The information collected can support scientific analysis and conservation planning.",

      "Citizen participation demonstrates that conservation is not limited to professional researchers. People with different backgrounds can contribute time, observations and skills to environmental projects.",

    ],


    "Wildlife Protection Blog": [

      "Wildlife protection involves addressing both direct and indirect threats to animals and their habitats. Illegal hunting, wildlife trafficking and habitat destruction can have serious effects on vulnerable species.",

      "Illegal wildlife trade can create demand for animal products and place additional pressure on already threatened populations. Preventing trafficking requires cooperation between authorities, conservation organizations and communities.",

      "Anti-poaching programs can include field patrols, wildlife monitoring, community awareness and stronger enforcement. Technology can also support conservation teams by helping monitor protected areas.",

      "Advocacy and public awareness are important parts of wildlife protection. Understanding the consequences of illegal wildlife trade can encourage people to avoid products and activities that contribute to wildlife exploitation.",

      "Long-term wildlife protection requires a combination of law enforcement, habitat conservation, community participation and education. These approaches can work together to reduce threats and support healthier wildlife populations.",

    ],


    "International Rhino Foundation Blog": [

      "Rhinoceroses are important large mammals that face significant conservation challenges, particularly from poaching and habitat loss. Protecting rhinos requires continued monitoring and long-term conservation programs.",

      "Poaching can have a serious effect on rhino populations because animals are illegally killed for their horns. Anti-poaching efforts therefore play an important role in protecting remaining populations.",

      "Habitat protection is equally important. Rhinos need suitable areas with food, water and space to move. Maintaining and restoring appropriate habitats can support healthier populations.",

      "Conservation teams can use field monitoring and research to understand population trends, animal movements and threats. This information can help guide protection strategies.",

      "Rhino conservation also depends on cooperation with local communities and authorities. Combining habitat protection, anti-poaching measures, research and community involvement can support long-term rhino conservation.",

    ],


    "The Elephant Sanctuary Blog": [

      "Elephants are highly social animals that require suitable habitats, food, water and safe areas in which to live. Both African and Asian elephants face conservation challenges in different parts of their ranges.",

      "Sanctuaries can provide protected environments for elephants that require care or rehabilitation. Such facilities can focus on animal welfare while also increasing public awareness about elephant conservation.",

      "Habitat loss and fragmentation can affect wild elephant populations by reducing access to food, water and traditional movement routes. Human-elephant interactions can become more frequent when natural habitats are reduced.",

      "Conservation efforts can include habitat protection, wildlife corridors, research and community programs. Understanding elephant behaviour and movement can help reduce conflict and improve conservation planning.",

      "Protecting elephants requires attention to both animal welfare and wild populations. Long-term conservation depends on maintaining suitable habitats and supporting responsible relationships between people and elephants.",

    ],


    "Panthera Blog": [

      "Big cats such as tigers, lions, jaguars and snow leopards play important roles in their ecosystems. As predators, they can influence prey populations and contribute to ecological balance.",

      "Many big cat species require large territories and connected habitats. Habitat fragmentation can make it harder for animals to move, find prey and maintain healthy populations.",

      "Conservation programs often combine field research, wildlife monitoring, habitat protection and efforts to reduce human-wildlife conflict. Understanding where big cats move can help identify important conservation areas.",

      "Local communities are also important partners in big cat conservation. Programs that address livestock losses and other sources of conflict can help improve coexistence between people and predators.",

      "Protecting big cats can also protect wider ecosystems. Maintaining habitats for these species can provide benefits for many other animals and plants that share the same landscapes.",

    ],


    "Ocean Conservancy Blog": [

      "Oceans support a vast variety of marine species and provide important resources for communities around the world. Healthy marine ecosystems are therefore important for both biodiversity and human well-being.",

      "Ocean pollution can affect marine animals and their habitats. Plastic waste, chemical pollution and other forms of contamination can enter marine environments through rivers, coastal areas and human activities.",

      "Sustainable fishing practices can help maintain healthy fish populations while supporting people whose livelihoods depend on marine resources. Responsible management can reduce pressure on marine ecosystems.",

      "Marine conservation also includes protecting important habitats such as coral reefs, mangroves, seagrass areas and coastal wetlands. These environments provide food, shelter and breeding areas for many species.",

      "Protecting oceans requires cooperation between governments, communities, researchers, conservation organizations and individuals. Reducing pollution and supporting responsible use of marine resources can contribute to healthier oceans.",

    ],


    "Global Wildlife Conservation Blog": [

      "Wildlife conservation projects around the world often require creative approaches that respond to local environmental and social conditions. Field teams can use research and technology to understand conservation challenges.",

      "Africa and Asia contain many important wildlife habitats and support a wide range of species. Conservation programs in these regions may focus on protecting habitats, monitoring populations and reducing threats.",

      "Field research provides valuable information about wildlife behaviour, population numbers, habitat use and environmental changes. This information can help conservation teams make informed decisions.",

      "Innovative conservation approaches can include wildlife monitoring technologies, community-based programs and habitat restoration. Combining different methods can help address complex conservation challenges.",

      "Conservation is a long-term process. Continued research, local participation and cooperation between organizations can help strengthen efforts to protect wildlife and natural ecosystems.",

    ],


    "WildAid Blog": [

      "Illegal wildlife trade is a major conservation challenge because it can create pressure on wild animal populations. Animals may be captured or killed to supply illegal markets.",

      "Poaching can affect individual animals as well as entire populations. When wildlife numbers decline significantly, ecosystems can also experience wider effects.",

      "Efforts to combat wildlife trafficking can include law enforcement, public awareness, international cooperation and campaigns that reduce demand for illegal wildlife products.",

      "Public campaigns can help people understand the consequences of wildlife trafficking and encourage responsible choices. Education can be especially useful when it reaches communities, consumers and younger generations.",

      "Reducing illegal wildlife trade requires cooperation across borders and sectors. Conservation organizations, governments, communities and the public all have roles to play in protecting wildlife from trafficking and poaching.",

    ],


    "National Wildlife Federation Blog": [

      "Habitat restoration is an important part of wildlife conservation. When natural environments are damaged or fragmented, restoration can help improve conditions for plants and animals.",

      "Restoration projects can involve native vegetation, wetlands, forests, grasslands and other ecosystems. The specific approach depends on the condition and ecological characteristics of the area.",

      "Environmental education can help people understand the importance of biodiversity and natural habitats. Schools and community programs can encourage responsible environmental behaviour.",

      "Conservation efforts can also involve monitoring wildlife populations and evaluating changes in habitat conditions. Regular monitoring helps identify whether restoration and protection activities are achieving their intended goals.",

      "Protecting habitats requires long-term cooperation between communities, conservation organizations, researchers and authorities. Restoration and education can work together to support healthier ecosystems.",

    ],


    "Wildlife Conservation Blog": [

      "Wildlife conservation includes a wide range of activities, from field research and habitat protection to policy development and community programs. Each approach can contribute to protecting species and ecosystems.",

      "Policy changes can influence how natural resources and wildlife habitats are managed. Effective conservation policies can provide frameworks for protecting species, reducing environmental pressures and supporting sustainable practices.",

      "Fieldwork provides researchers with direct information about wildlife and their habitats. Observations, surveys and monitoring programs can help identify changes in animal populations and environmental conditions.",

      "Research can also help conservation teams understand the causes of population decline and identify potential solutions. Scientific information is especially useful when conservation decisions need to be made over long periods.",

      "Successful wildlife conservation combines policy, research, fieldwork and community participation. These different elements can support one another and contribute to long-term biodiversity protection.",

    ],


    "Conservation International Blog": [

      "Biodiversity is the variety of life found across the planet, including animals, plants, microorganisms and the ecosystems in which they live. Protecting biodiversity is important for maintaining healthy natural systems.",

      "Conservation efforts can focus on forests, oceans, wetlands, grasslands and other ecosystems that support large numbers of species. Protecting these habitats can help maintain ecological processes.",

      "Sustainable development seeks to balance environmental protection with human needs. Communities depend on natural resources for food, water, livelihoods and other essential services.",

      "Conservation programs can therefore combine biodiversity protection with sustainable resource management. Approaches that involve local communities can help connect environmental goals with social and economic needs.",

      "Global conservation requires cooperation across countries and communities. By protecting biodiversity and promoting sustainable practices, conservation efforts can contribute to healthier ecosystems and a more sustainable future.",

    ],

  }


  // Find the blog using the ID from the URL

  const blog = blogs.find(
    (item) => String(item.ID) === String(id)
  )


  // Loading

  if (loading) {

    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">

        <div className="text-center">

          <p className="text-green-700 font-semibold text-lg">
            Loading story...
          </p>

        </div>

      </section>
    )

  }


  // Error

  if (error) {

    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-green-950 mb-4">
            Unable to Load Story
          </h1>


          <p className="text-red-600 mb-6">
            {error}
          </p>


          <Link
            to="/blog"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Back to Stories
          </Link>

        </div>

      </section>
    )

  }


  // Blog not found

  if (!blog) {

    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-green-950 mb-4">
            Story Not Found
          </h1>


          <p className="text-gray-600 mb-6">
            The wildlife story you are looking for does not exist.
          </p>


          <Link
            to="/blog"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Back to Stories
          </Link>

        </div>

      </section>
    )

  }


  // API data

  const title = blog["Blog Title"]

  const category = blog["Focus Area"]

  const author = blog["Author/Organization"]

  const date = blog["Last Updated"]

  const description = blog.Description


  // Detailed article content

  const content = blogContent[title] || [

    description ||
    "This story provides information about wildlife conservation and environmental protection.",

  ]


  // Image based on blog ID

  const imageName = `blog-${blog.ID}.jpg`

  const image =
    blogImages[imageName] || fallbackImage


  return (

    <div>


      {/* Hero */}

      <section className="relative h-[420px]">


        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />


        <div className="absolute inset-0 bg-black/50" />


        <div className="absolute inset-0 flex items-center">


          <div className="max-w-5xl mx-auto px-6 text-white w-full">


            <span className="inline-block bg-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              {category}
            </span>


            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
              {title}
            </h1>


          </div>


        </div>


      </section>


      {/* Story Content */}

      <section className="py-16 bg-white">


        <div className="max-w-4xl mx-auto px-6">


          <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-8">
            About This Story
          </h2>


          {/* Author and Date */}

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500">


            {author && (

              <span>

                By{" "}

                <span className="font-semibold text-green-700">
                  {author}
                </span>

              </span>

            )}


            {date && (

              <span>
                • {date}
              </span>

            )}


          </div>


          {/* Content */}

          <div className="space-y-7 text-lg leading-8 text-gray-700">


            {content.map((paragraph, index) => (

              <p key={index}>
                {paragraph}
              </p>

            ))}


          </div>


          {/* Back Button */}

          <div className="mt-12 border-t border-gray-200 pt-8">


            <Link
              to="/blog"
              className="inline-flex items-center text-green-700 font-semibold hover:text-green-900 transition"
            >
              ← Back to All Stories
            </Link>


          </div>


        </div>


      </section>


      {/* CTA */}

      <section className="py-16 bg-green-950 text-white">


        <div className="max-w-4xl mx-auto px-6 text-center">


          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Be Part of Wildlife Conservation
          </h2>


          <p className="text-green-100 mb-8 text-lg">
            Every action can contribute to protecting wildlife and preserving
            our natural world.
          </p>


          <Link
            to="/join"
            className="inline-block bg-white text-green-900 px-7 py-3 rounded-lg font-semibold hover:bg-green-100 transition"
          >
            Join the Mission
          </Link>


        </div>


      </section>


    </div>

  )
}


export default BlogDetails