import React from 'react'

const icons = [
  { name: 'gitbook',
    url:'https://blokfield.gitbook.io/robinia/'
   },
  { name: 'telegram' ,
    url:'https://t.me/officialrobinia'
  },
  { name: 'twit',
    url:'https://twitter.com/robiniaswap'
   },
  { name: 'discord',
    url:'https://discord.gg/qZedg3VG'
 },
]

const Socials = () => {
  return (
    <div className="flex items-center justify-start">
      {icons.map((icon) => {
        return (
          <a href={icon.url} key={icon.name} target="_blank" rel="noreferrer" className="rbs-bg h-10 w-10 flex justify-center items-center rounded-xl mr-2 hover:opacity-80 shadow-sm">
            <img src={`/images/${icon.name}.svg`} alt={icon.name} width="20px"/>
          </a>
        )
      })}
    </div>
  )
}

export default Socials
