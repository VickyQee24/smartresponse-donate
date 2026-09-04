export type Block =
  | { kind: 'h'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'list'; items: string[] };

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  readTime: string;
  body: Block[];
}

const SIGN_OFF: Block[] = [
  {
    kind: 'quote',
    text:
      '112 Smart Response App — Connecting People. Connecting Response. ' +
      'Protecting Lives. One App. One Community. One Response.'
  }
];

export const BLOG_POSTS: BlogPost[] = [

  {
    slug: 'building-stronger-communities-together',
    category: 'Community',
    title: 'Building stronger communities together through Smart Response',
    excerpt:
      'A strong community is built on more than roads and buildings. It is ' +
      'built on people looking out for one another.',
    author: 'Victoria Chidinma Chukwu',
    authorRole: 'Founder / Trustee Chairperson, SRYF',
    readTime: '8 min read',
    body: [
      { kind: 'p', text: `A strong community is built on more than roads, buildings, schools, and businesses. It is built on people looking out for one another. When individuals, families, institutions, government agencies, emergency services, and technology work together, communities become safer, healthier, and more resilient.` },
      { kind: 'p', text: `In today's rapidly changing world, emergencies can happen at any time. A fire can break out, someone may suddenly become ill, an accident can occur on the road, or a person may face a security threat. In such moments, every second matters. The ability to report an emergency quickly and connect the right responders can make the difference between a crisis being contained and lives being lost.` },

      { kind: 'h', text: 'Introducing 112 Smart Response App' },
      { kind: 'p', text: `The 112 Smart Response App, developed by Smart Response App Technologies Limited, is designed to contribute to stronger and safer communities by bringing emergency reporting, basic health support, location technology, and personal safety tools together in one digital platform.` },
      { kind: 'p', text: `It is a 3-in-1 emergency reporting mobile application designed to connect people who need help with relevant emergency response services in real time, including fire, health, security, and road assistance.` },
      { kind: 'p', text: `Rather than leaving people to search for different emergency numbers or services during a crisis, the platform is designed to simplify the process of requesting assistance.` },

      { kind: 'h', text: 'Connecting communities to help when it matters most' },
      { kind: 'p', text: `Imagine a road accident occurs and a person needs urgent assistance. Instead of struggling to determine who to call, the user can use the Smart Response platform to report the emergency and provide relevant information that can help responders understand the situation.` },
      { kind: 'p', text: `Similarly, in the event of a fire, security emergency, or health-related incident, the platform is designed to facilitate faster communication between the person requesting help and the appropriate response network.` },
      { kind: 'quote', text: `A connected community is a more responsive community.` },
      { kind: 'p', text: `Technology cannot replace trained emergency professionals, but it can help people communicate emergencies faster, share useful information, and improve coordination.` },

      { kind: 'h', text: 'Supporting health access through technology' },
      { kind: 'p', text: `Healthcare is another important part of community wellbeing. The Smart Response App incorporates an AI-powered doctor designed to provide basic health information and support for mild illnesses. It can help users understand common symptoms and determine appropriate next steps.` },
      { kind: 'p', text: `The platform also incorporates GPS technology to help direct users toward nearby hospitals or healthcare facilities when medical attention is needed.` },
      { kind: 'p', text: `The AI feature is intended as a support tool — not a replacement for qualified healthcare professionals. Serious, worsening, or emergency symptoms require professional medical attention.` },

      { kind: 'h', text: 'Safety beyond the smartphone' },
      { kind: 'p', text: `Community safety also requires innovation beyond conventional mobile applications. Smart Response is designed to incorporate anti-kidnapping alarm and SOS alert functionality through compatible smart gadgets. Such technology can provide another potential channel for a person to trigger an alert when they are unable to safely use their phone in the usual way.` },
      { kind: 'p', text: `The broader vision is to create an ecosystem where mobile technology, smart devices, GPS, emergency networks, and people work together to improve safety.` },

      { kind: 'h', text: 'Building a culture of community responsibility' },
      { kind: 'p', text: `Technology alone cannot build a strong community. We must also build a culture where people understand that community safety is a shared responsibility. That means:` },
      { kind: 'list', items: [
        `Reporting emergencies promptly and responsibly.`,
        `Helping vulnerable people access emergency services.`,
        `Supporting neighbours during crises.`,
        `Teaching young people about safety and responsible technology use.`,
        `Encouraging institutions to strengthen emergency preparedness.`,
        `Building partnerships between communities, government agencies, healthcare providers, security agencies, and emergency responders.`,
        `Promoting digital literacy so more people can benefit from life-saving technologies.`
      ]},
      { kind: 'p', text: `The Smart Response vision therefore goes beyond an app. It is about creating connections between people and the systems designed to protect them.` },

      { kind: 'h', text: 'Technology as a bridge, not a barrier' },
      { kind: 'p', text: `One of the biggest challenges facing communities is the gap between people who need assistance and the services available to help them.` },
      { kind: 'p', text: `A person may know that an emergency service exists but may not know the correct number, location, or procedure to access it. Someone experiencing a medical emergency may be frightened and unable to communicate effectively. A person facing a security threat may not have enough time to make a conventional phone call.` },
      { kind: 'p', text: `Digital platforms can help bridge some of these gaps by making emergency communication more accessible and structured. For Smart Response, the goal is to make technology work for the community, not the other way around.` },

      { kind: 'h', text: 'Creating safer communities together' },
      { kind: 'p', text: `Building stronger communities requires collaboration. Government agencies provide public services and emergency infrastructure. First responders provide professional assistance. Healthcare institutions provide medical care. Technology companies develop tools that improve communication and access. Schools and universities educate young people. Businesses and civil society organizations contribute resources and community engagement.` },
      { kind: 'p', text: `And at the centre of all these efforts is the individual citizen.` },
      { kind: 'p', text: `112 Smart Response App seeks to connect these elements through technology. Its long-term vision is a community where a person in distress does not feel completely alone; where emergency information can reach the appropriate response channel more efficiently; where technology supports access to basic health information; and where smart devices can provide additional safety mechanisms.` },

      { kind: 'h', text: 'Our collective responsibility' },
      { kind: 'p', text: `A stronger community begins when we stop asking, "Who will help?" and start asking, "How can we help?"` },
      { kind: 'p', text: `Every responsible emergency report, every neighbour who offers assistance, every healthcare worker who responds, every first responder who answers a call, and every technology that improves communication contributes to a safer society.` },
      { kind: 'p', text: `Smart Response is built around this simple idea: when communities are connected, informed, and prepared, they are better equipped to protect lives.` },
      { kind: 'p', text: `Building stronger communities is not the responsibility of one organization or one technology. It is a collective mission. Together, through innovation, collaboration, responsible citizenship, and faster access to emergency support, we can work toward communities where help is closer, response is smarter, and every life matters.` },
      ...SIGN_OFF
    ]
  },

  {
    slug: 'youth-the-power-of-young-people',
    category: 'Youth',
    title: 'Youth: the power of young people',
    excerpt:
      'Young people are not only the leaders of tomorrow; they are also the ' +
      'creators, innovators and change-makers of today.',
    author: 'Mariam Marina',
    authorRole: 'Contributor',
    readTime: '9 min read',
    body: [
      { kind: 'p', text: `Young people are often described as the leaders of tomorrow. But the truth is that young people are not only the leaders of tomorrow; they are also the creators, innovators, problem-solvers, and change-makers of today.` },
      { kind: 'p', text: `Across communities, young people are using technology, education, creativity, entrepreneurship, and social awareness to address challenges that affect their generation and society as a whole.` },
      { kind: 'p', text: `The strength of any nation is closely connected to the potential of its young people. When young minds are given the right opportunities, tools, information, and platforms, they can transform challenges into solutions and ideas into meaningful action. This is where technology can play an important role.` },

      { kind: 'h', text: 'Introducing 112 Smart Response App' },
      { kind: 'p', text: `The 112 Smart Response App, developed by Smart Response App Technologies Limited, is designed to connect people with emergency support through technology while promoting safety, awareness, and responsible citizenship.` },
      { kind: 'p', text: `For young people, the platform represents more than a digital tool. It can serve as part of a wider conversation about how technology can empower a generation to become more informed, prepared, responsible, and responsive.` },
      { kind: 'p', text: `In a world where young people spend significant amounts of time using smartphones and digital platforms, technology provides an opportunity to turn digital engagement into meaningful social impact.` },

      { kind: 'h', text: 'Young people as agents of change' },
      { kind: 'p', text: `Young people have always played an important role in shaping society. From starting businesses and creating digital content to developing innovative solutions and speaking out about issues affecting their communities, young people continue to demonstrate that age does not determine the size of an individual's impact.` },
      { kind: 'p', text: `A young person can identify a problem. Another can develop an idea. Another can use technology to communicate that idea. And together, these individuals can create change.` },
      { kind: 'p', text: `The Smart Response vision supports the idea that young people should not simply be users of technology. They should also become responsible participants in building safer and more responsive communities.` },

      { kind: 'h', text: 'Turning technology into responsibility' },
      { kind: 'p', text: `Technology gives young people access to information and communication like never before. But with this access comes responsibility.` },
      { kind: 'p', text: `Young people must understand how to use technology responsibly, particularly when dealing with emergencies, health information, security situations, and the wellbeing of others.` },
      { kind: 'p', text: `The 112 Smart Response App is designed to make emergency communication more accessible by connecting users with relevant response services, including fire, health, security, and road assistance. Instead of being passive observers during emergencies, young people can become informed individuals who understand how and when to seek appropriate assistance.` },
      { kind: 'p', text: `The goal is not to encourage young people to put themselves in danger. Rather, it is to encourage them to understand that responsible action can save lives.` },

      { kind: 'h', text: 'The power of one young person' },
      { kind: 'p', text: `Imagine a young student walking home when they notice a road accident. Instead of simply recording the incident on a phone and walking away, the student understands the importance of getting help.` },
      { kind: 'p', text: `Using the Smart Response platform, the young person can report the emergency and provide relevant information that can assist the appropriate response network. That one action may help someone receive assistance faster.` },
      { kind: 'p', text: `Now imagine thousands of young people across different communities developing the same culture of responsibility. One person becomes a responsible citizen. One responsible citizen influences another. And gradually, a culture of preparedness and responsiveness begins to grow.` },
      { kind: 'quote', text: `That is the power of young people.` },

      { kind: 'h', text: 'Empowering young minds through health awareness' },
      { kind: 'p', text: `Young people also face health challenges that require proper information and timely assistance. The Smart Response App incorporates an AI-powered doctor designed to provide basic health information and support for mild illnesses. It can help users understand common symptoms and consider appropriate next steps.` },
      { kind: 'p', text: `The platform also incorporates GPS technology to help users locate nearby hospitals or healthcare facilities when medical attention is required.` },
      { kind: 'p', text: `However, technology should complement — not replace — qualified healthcare professionals. Young people must understand that serious, worsening, or emergency symptoms require professional medical attention. The goal is to encourage young people to become more informed about their health while knowing when professional help is necessary.` },

      { kind: 'h', text: 'Young people and personal safety' },
      { kind: 'p', text: `Personal safety is another area where technology can support young people. Smart Response is designed to incorporate SOS and anti-kidnapping alarm functionality through compatible smart gadgets. Such technology may provide an additional channel for triggering an alert when a person is unable to safely use their phone in the usual way.` },
      { kind: 'p', text: `For young people who travel to school, work, university, events, and other places every day, awareness of personal safety and access to emergency support can be extremely important.` },
      { kind: 'p', text: `Technology cannot eliminate every danger. But it can provide additional tools that may help people communicate when they need assistance.` },

      { kind: 'h', text: 'Young people as digital ambassadors' },
      { kind: 'p', text: `The influence of young people extends beyond their immediate surroundings. Through social media, content creation, online communities, and digital communication, young people can spread information to hundreds, thousands, and even millions of people. This influence can be used positively.` },
      { kind: 'list', items: [
        `Young people can educate their peers about emergency preparedness.`,
        `They can promote responsible use of emergency services.`,
        `They can discourage false emergency reports.`,
        `They can encourage people to seek professional help when necessary.`,
        `They can teach others about personal safety.`,
        `And they can use their creativity to make important information easier for their communities to understand.`
      ]},
      { kind: 'p', text: `A young person's phone can therefore become more than a device for entertainment. It can become a tool for awareness, education, connection, and positive change.` },

      { kind: 'h', text: 'From consumers to creators' },
      { kind: 'p', text: `One of the greatest opportunities available to today's youth is the ability to create. Young people are no longer limited to consuming information created by others.` },
      { kind: 'p', text: `They can build applications. Create businesses. Produce films. Develop digital platforms. Create educational content. Start movements. And develop solutions to problems within their communities.` },
      { kind: 'p', text: `The Smart Response vision encourages this mindset. Young people should be encouraged to ask: What problem can I solve? Who can I help? What idea can I create? How can technology make my community better?` },
      { kind: 'p', text: `These questions can be the beginning of innovation.` },

      { kind: 'h', text: 'Building a generation that responds' },
      { kind: 'p', text: `The future requires young people who are not only intelligent but also responsible.` },
      { kind: 'list', items: [
        `Young people who can respond to emergencies appropriately.`,
        `Young people who understand the importance of accurate information.`,
        `Young people who care about the safety of others.`,
        `Young people who are willing to volunteer, innovate, educate, and serve their communities.`,
        `Young people who understand that having access to technology comes with responsibility.`
      ]},
      { kind: 'p', text: `The 112 Smart Response App is part of a broader vision of using technology to connect people with the systems designed to support them.` },

      { kind: 'h', text: 'Our collective responsibility' },
      { kind: 'p', text: `Empowering young people is not the responsibility of young people alone. Parents, schools, universities, government agencies, emergency responders, healthcare professionals, businesses, technology developers, and communities all have important roles to play.` },
      { kind: 'p', text: `We must create environments where young people can learn, innovate, participate, and contribute. We must listen to their ideas. We must provide opportunities for them to develop their skills. And most importantly, we must remind them that their voices matter.` },
      { kind: 'p', text: `Because when young people are empowered, communities become stronger. When young people are informed, communities become more prepared. When young people are innovative, communities discover new solutions. And when young people choose responsibility, society becomes safer.` },

      { kind: 'h', text: 'The future is young' },
      { kind: 'p', text: `The future is not something that will simply happen to us. It is something that today's young people are already building. Every idea, every innovation, every responsible decision, and every act of service contributes to the society we will have tomorrow.` },
      { kind: 'p', text: `The power of young people is not simply in their numbers. It is in their energy, creativity, courage, technology, ideas, and ability to imagine a better world.` },
      { kind: 'p', text: `Smart Response seeks to be part of that journey by connecting technology, people, and emergency response in ways that can support safer and more responsive communities. Because a generation that knows how to think, connect, respond, and innovate is a generation capable of changing the world.` },
      { kind: 'quote', text: `One Young Person. One Idea. One Action. One Change.` },
      ...SIGN_OFF
    ]
  },

  {
    slug: 'why-dignity-matters',
    category: 'Impact',
    title: 'Why dignity matters: the light in Agidingbi',
    excerpt:
      'Innovation without dignity creates tools people fear. When youth are ' +
      'given dignity, they redesign the future so everyone can stand tall in it.',
    author: 'Olagunju Damilare Elijah',
    authorRole: 'Trustee, SRYF',
    readTime: '7 min read',
    body: [
      { kind: 'p', text: `In Ikeja, Lagos, there was a small tech hub tucked behind LTV on Lateef Jakande Road. The walls were painted bright yellow, but the paint was peeling. Inside, 19-year-old Tolu fixed old phones and laptops for people in the neighbourhood.` },
      { kind: 'p', text: `People called it "Tolu's corner." Not because he owned the space, but because he always showed up.` },
      { kind: 'p', text: `Tolu wasn't from a "big" school. He didn't have investors. What he had was time, curiosity, and a belief that everyone who walked in deserved to be treated like they mattered.` },
      { kind: 'p', text: `One rainy afternoon, Mama Bose, a market trader, came in crying. Her phone — with all her customer contacts and her small savings app — had died. The other repair shops told her, "Buy a new one. This one is finished." Cost: ₦120,000. She only had ₦8,000.` },
      { kind: 'p', text: `Tolu didn't laugh. He didn't rush her. He pulled up a stool, offered her water, and said, "Mama, let's see what we can do together."` },
      { kind: 'p', text: `For three hours he worked. He explained each step. "This chip is tired, but we can wake it." When it finally turned on, Mama Bose hugged him.` },
      { kind: 'quote', text: `"You treated me like a person, not a problem."` },
      { kind: 'p', text: `That moment travelled.` },

      { kind: 'h', text: 'A student, a prototype and a name' },
      { kind: 'p', text: `A week later, a university student named Ada came in. She was building an app to help market traders track debt without shame — no big words, no complicated forms. She was stuck. Her code kept crashing and her professor told her "this isn't real innovation."` },
      { kind: 'p', text: `Tolu looked at her prototype. "You're not just coding," he said. "You're protecting people's dignity. That's the hardest and most important part."` },
      { kind: 'p', text: `They stayed up all night debugging. Ada launched the app two months later. She named it "Iye" — meaning "dignity" in Yoruba.` },
      { kind: 'p', text: `Iye didn't ask for collateral. It didn't use harsh reminder tones. It let traders set their own repayment dates and sent gentle nudges. Within a year, 4,000 traders in Lagos were using it. Defaults dropped. Trust went up.` },

      { kind: 'h', text: 'Then came the hard part' },
      { kind: 'p', text: `The city council announced a "clean-up" that would demolish all "informal" tech spaces to make room for a new mall. No notice. No compensation.` },
      { kind: 'p', text: `People were angry. But Tolu and Ada did something different. Instead of protesting with shouts, they invited the council officials to "Tolu's corner." They showed them Mama Bose's phone. They showed them the data from Iye — how dignity in design reduced debt and increased income. They showed them youth who weren't waiting for handouts, but building solutions.` },
      { kind: 'p', text: `One official, Mrs. Adebayo, listened. She had grown up selling akara too. She said, "We've been making laws about people, not with people."` },
      { kind: 'p', text: `Because of that meeting, the demolition was paused. The hub wasn't destroyed. Instead, the council partnered with Tolu, Ada, and 12 other youth to create The Dignity Innovation Lab — a space where young people could build tools for justice: apps for legal aid, for fair wages, for reporting harassment without fear.` },

      { kind: 'h', text: 'Why dignity mattered' },
      { kind: 'list', items: [
        `For youth: dignity told Tolu and Ada that their ideas were valid even without big titles. It gave them courage to innovate.`,
        `For innovation: dignity changed how they built. Iye wasn't the flashiest app, but it was the one people actually trusted and used.`,
        `For justice: dignity changed who got a seat at the table. When leaders saw people as humans first, policy stopped being punishment and started being partnership.`
      ]},
      { kind: 'p', text: `Years later, there's a plaque on the wall of the lab. It doesn't list donors. It just says:` },
      { kind: 'quote', text: `"We began here, when someone chose to see us."` },

      { kind: 'h', text: 'The takeaway' },
      { kind: 'p', text: `Innovation without dignity creates tools people fear. Justice without dignity creates laws people avoid. But when youth are given dignity, they don't just fix problems. They redesign the future so everyone can stand tall in it.` },

      { kind: 'h', text: 'Introducing 112 Smart Response App' },
      { kind: 'p', text: `The 112 Smart Response App, developed by Smart Response App Technologies Limited, is designed to contribute to stronger and safer communities by bringing emergency reporting, basic health support, location technology, and personal safety tools together in one digital platform.` },
      { kind: 'p', text: `It is an emergency reporting mobile application designed to connect people who need help with relevant emergency response services in real time, including fire, health, security, and road assistance. Rather than leaving people to search for different emergency numbers or services during a crisis, the platform is designed to simplify the process of requesting assistance.` },
      { kind: 'p', text: `Technology cannot replace trained emergency professionals, but it can help people communicate emergencies faster, share useful information, and improve coordination. The Smart Response vision goes beyond an app — it is about creating connections between people and the systems designed to protect them.` },
      ...SIGN_OFF
    ]
  }
];

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
