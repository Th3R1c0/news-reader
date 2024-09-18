import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImageIcon, LinkIcon, TextIcon, PlusIcon, TrashIcon } from 'lucide-react'

export default function ContentPaster({content, setContent}) {
  
  const [image, setImage] = useState<string | null>(null)
  const [links, setLinks] = useState<string[]>([''])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0]
    // if (file) {
    //   const reader = new FileReader()
    //   reader.onload = (e) => {
    //     setImage(e.target?.result as string)
    //   }
    //   reader.readAsDataURL(file)
    // }


  }

  const addLink = () => setLinks([...links, ''])
  const removeLink = (index: number) => setLinks(links.filter((_, i) => i !== index))
  const updateLink = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
  }

  return (
    <div className=" flex flex-col">
        
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold text-center">Custom Sources</h1>
      </header>
      <main className="p-4 h-full  flex-1">
        <Tabs defaultValue="text" className="flex-grow h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="text" className="flex items-center justify-center gap-2">
              <TextIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center justify-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center justify-center gap-2">
              <LinkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Link</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="flex-grow h-full flex flex-col space-y-2">
            <div className='text-sm font-semibold text-gray-400'>characters: {content.length}</div>
            <Textarea
            
              placeholder="Paste your text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-grow  h-48 resize-y"
              
              
            />
          </TabsContent>
          <TabsContent value="image" className="flex-grow flex items-center justify-center">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {image ? (
                  <img src={image} alt="Uploaded content" className="max-w-full max-h-full object-contain" />
                ) : (
                  <>
                    <ImageIcon className="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">Comming soon</p>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                  </>
                )}
              </div>
              {/* <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" /> */}
            </label>
          </TabsContent>
          <TabsContent value="link" className="flex flex-col ">
            <div className=" flex flex-col space-y-4">
              {links.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="url"
                    placeholder="Paste your link here..."
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                    className="flex-grow"
                  />
                  <Button variant="outline"  size="icon" onClick={() => removeLink(index)}>
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addLink} disabled={true} className="mt-4">
              <PlusIcon className="w-4 h-4 mr-2" /> Add Link
            </Button>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}