import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import BottomBar from '~/components/app/bottom-bar/bottom-bar'
import Line from '~/components/line/line'

export const head: DocumentHead = {
  title: 'ਅਰਦਾਸ - Shabad OS',
  meta: [
    {
      name: 'description',
      content: 'Nitnem Bāṇī Ardās',
    },
  ],
}

export const getData = routeLoader$(async () => {
  const resp = await fetch('http://127.0.0.1:5176/api/app/ardas/')
  const json = await resp.json()
  return json
})

export default component$(() => {
  const data = getData()
  return (
    <>
      {data.value.map(({ id, src, pronunciation, translation }: any) => (
        <Line
          id={id}
          src={src}
          pronunciation={pronunciation}
          translation={translation}
        />
      ))}
      <BottomBar prevLink='/app/rehras-sahib' nextLink='/app/kirtan-sohila' />
    </>
  )
})
