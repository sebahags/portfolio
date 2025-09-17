"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const ContactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  })

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  })

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    console.log("Form submitted:", values)
    alert("Thank you for your message! I'll get back to you soon.")
    form.reset()
  }

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="I'm always interested in new opportunities and collaborations. Let's discuss how we can work together!"
    >
      <div className="grid lg:grid-cols-2 gap-12" ref={ref}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear
                from you. I'm always open to discussing new ideas and opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-muted-foreground">hello@yourname.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-zinc-900/95 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} id="name" type="text" className="bg-input border-border text-foreground" placeholder="Your full name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} id="email" type="email" className="bg-input border-border text-foreground" placeholder="your.email@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea {...field} id="message" rows={5} className="bg-input border-border text-foreground resize-none" placeholder="Tell me about your project or just say hello..." />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg">
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </SectionWrapper>
  )
}
