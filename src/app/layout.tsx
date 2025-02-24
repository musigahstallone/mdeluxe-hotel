import { Inter, Montserrat, Rubik_Doodle_Shadow } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import React from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const rubikDoodleShadow = Rubik_Doodle_Shadow({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-rubik-doodle-shadow",
})

export const metadata: Metadata = {
    title: "MDeluxe Hotel",
    description: "Experience luxury and comfort at MDeluxe Hotel. Book your stay today!",
    keywords: ["hotel", "luxury", "accommodation", "MDeluxe"],
    openGraph: {
        title: "MDeluxe Hotel - Luxury and Comfort",
        description: "Discover unparalleled luxury and comfort at MDeluxe Hotel. Book your dream stay now!",
        url: "https://mdeluxehotel.com",
        siteName: "MDeluxe Hotel",
        images: [
            {
                url: "https://mdeluxehotel.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "MDeluxe Hotel Luxury Room",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@MDeluxeHotel",
        title: "MDeluxe Hotel - Luxury and Comfort",
        description: "Experience elegance and relaxation with top-notch accommodation at MDeluxe Hotel.",
        images: ["https://mdeluxehotel.com/twitter-card.jpg"],
    },
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${montserrat.variable} ${rubikDoodleShadow.variable} font-sans`}>
        {/*<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>*/}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <CartProvider>
                <Navbar />
                <main className="container mx-auto px-4 py-8">{children}</main>
            </CartProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}

