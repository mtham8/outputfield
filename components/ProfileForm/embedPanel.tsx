import React, { BaseSyntheticEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import { Button } from '../Button'

type EmbedPanelProps = {
  handleEmbedWork: (work: FormData) => void
};

type EmbeddedWork = {
  title: string,
  url: string,
}

export default function EmbedPanel({
  handleEmbedWork
}: EmbedPanelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmbeddedWork>()
  const onSubmit = (data: EmbeddedWork, e: BaseSyntheticEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('workType', 'embeddedWork')
    formData.append('url', data.url)
    formData.append('title', data.title)
    handleEmbedWork(formData)
  }
  return (
    <form
      className='text-center'
      onSubmit={handleSubmit(onSubmit as SubmitHandler<EmbeddedWork>)}
    >
      <input
        placeholder="Link Youtuboe, Vimeo, SoundCloud, etc."
        {...register('url', {
          required: true,
          validate: {
            playableUrl: url => ReactPlayer.canPlay(url),
          }
        })}
      />
      {errors?.url?.type === 'required' && (
        <p className="text-red-500 text-xs italic">
          Please fill out this field. 
        </p>
      )}
      {errors?.url?.type === 'playableUrl' && (
        <p className="text-red-500 text-xs italic">
          Not a valid URL. 
        </p>
      )}
      <input 
        placeholder="Title"
        {...register('title', { required: true })} 
      />
      {errors['title'] && (
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      )}
      <Button type='submit'>
        Embed
      </Button>
      
    </form>
  )
}
