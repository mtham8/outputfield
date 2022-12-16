import React from 'react'
import { useRouter } from 'next/router'
import { ArtistWithUserAndNominatedByAndWorkAndLinks } from '../../pages/api/artists/[name]'
import { Button } from '../Button'
import Link from 'next/link'

interface Props {
  artist: ArtistWithUserAndNominatedByAndWorkAndLinks;
  className?: string;
  includeContact?: boolean;
}

export const InfoPanel: React.FC<Props> = ({
  artist,
  className,
  includeContact = true,
}) => {
  const router = useRouter()

  console.log(artist)

  return (
    <div
      className={`${className} relative min-h-184 grid text-base p-3`}
      id="infoPanel">
      <div
        id="bio"
        className="w-full mb-8 border-box whitespace-pre-wrap uppercase">
        {artist?.bio}
      </div>

      <div
        id="mediums"
        className="relative uppercase inline-block h-36 w-9/12 mb-16 mx-auto content-box ">
        <img src="/dashedCircle.svg" className="absolute ml-4" />
        <div className="flex flex-col justify-between mt-4 h-full">
          {artist?.mediums.length !== 0 && (
            <div className="relative">
              <b>Mediums:</b>
              <br />
              {artist?.mediums.join(', ')}
            </div>
          )}
          {artist?.mediumsOfInterest.length !== 0 && (
            <div className="relative self-end">
              <b>Mediums Of Interest:</b>
              <br />
              {artist?.mediumsOfInterest.join(', ')}
            </div>
          )}
        </div>
      </div>

      <div id="artistLinks" className="relative mb-24 h-32">
        <img src="/dashedEllipses4.svg" className="absolute" />
        <div className="absolute flex flex-col space-y-4 mt-4">
          {artist?.links.map(({ title, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="uppercase flex space-x-2 items-center">
              <span>{title}</span>
              <img src="/externalLinkIcon.svg" />
            </a>
          ))}
        </div>
      </div>
      {
        artist?.user.nominatedBy && (
          <div id="artistReference" className={'flex justify-end relative w-full h-20 mb-20'}>
            <img src="/dashedEllipses2.svg" className="absolute" />
            <div className="absolute uppercase mt-2 mr-8">
          Referred By:
              <br />
              <a
                className="underline glow-highlight"
                href={'/artists/'+artist?.user?.nominatedBy?.artist?.handle}
              >
                {artist?.user.nominatedBy?.name}
              </a>
            </div>
          </div>
        )
      }
      

      {includeContact && (
        (<Link href={`${router.asPath}/contact`} passHref>
          <Button>contact</Button>
        </Link>)
      )}
    </div>
  )
}
