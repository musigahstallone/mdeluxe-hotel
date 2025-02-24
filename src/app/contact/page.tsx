import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <Input id="name" placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">
            Message
          </label>
          <Textarea id="message" placeholder="Your message here..." />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  )
}

