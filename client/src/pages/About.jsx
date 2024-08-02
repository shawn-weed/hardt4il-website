import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Hardt4il</h1>
        </div>
        <div className='text-md text-gray-300 flex flex-col gap-6'>
          <p>
            Hardt4il is a brand dedicated to Mountain Biking. Sure, we may cover other topics and share our thoughts on RC cars, video games, music, etc. but at our core we are bikers just filling the time until our next ride. Come join us and stay up to date on the latest mountain biking gear, tips, and trends.
          </p>

          <p>
            <a href='./search' className='hover:underline text-fuchsia-700'>Here</a> you will find products reviews, articles covering what I have learned while trying to master a skill, bike park and trail system reviews, and more. Content is constantly being added so check back and <a href='./sign-up' className='hover:underline text-fuchsia-700'>sign up!</a> 
          </p>

          <p>
          This website more or less started as a project and was coded by me so you may see new features added as I have time to improve the site. We encourage you engage with a community of like minded people with a love for biking. You can comment and like posts as well as each other's comments. Let us know of any improvememnts you'd like to see!
          </p>

          <p>
            Happy riding -- Shawn
          </p>
        </div>
      </div>
    </div>
  )
}
