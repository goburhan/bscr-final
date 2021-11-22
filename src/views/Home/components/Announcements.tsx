import React from 'react'
import { Timeline } from 'react-twitter-widgets'

const Announcements = () => {
  return (
    <div className="rbs-card relative h-full">
      <div className="text-2xl text-white font-bold mb-6">Announcements</div>
       
           <Timeline
            dataSource={{
            sourceType: 'profile',
            screenName: 'robiniaswap',
          }}
          options={{
            height: '300',
            chrome: 'noheader, nofooter  , noborders , noscrollbar',
            width: '100%',
      
          }

        }

        />
    </div>
  )
}

export default Announcements
