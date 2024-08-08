import React from 'react'

export default function AboutMe() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Me</h1>
        </div>
        <div className='text-md text-gray-300 flex flex-col gap-6'>
          <p>
           My name is Shawn and obviously, I love mountain biking. Career wise, I am a developer. I've
           loved programming since my first "Intro to Web Development" course. I moved on from programming
           in HTML5 and CSS in that course to learning Python, SQL, and JS while also dabbling with
           other languages such as PowerShell and Java. Coding brings new challenges everyday that 
           drive me to learn and become better at what I do.

          </p>
          This passion project started when I wanted to combine my interests and build a site around my love for mountain biking. I decided 
          to dive into a full stack project as an outlet for my creative side. I chose a MERN stack for its popularity and features. React is
          known for its scalability so I can quickly adapt the site to fit my needs as it grows.
          <p>
            <a href='https://www.github.com/kurknuckle' className='text-fuchsia-700 hover:underline'>Here </a> 
            you can find my GitHub with some of the other projects I have worked on. I have coded everything from small programs to automate account creation for active directory to larger projects like software designed to manage Chromebook assets which helped reduce the number of lost assets and streamline repairs. You can find me on <a href='https://www.linkedin.com/in/shawn-weed/' className='hover:underline text-fuchsia-700'>LinkedIn</a> as well. Please feel free to reach out there if you'd like to know more.
          </p>

          <p>
            Happy riding -- Shawn
          </p>
        </div>
      </div>
    </div>
  )
}
