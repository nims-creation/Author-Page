#!/bin/bash

# Create directories if they don't exist
mkdir -p images/author images/books images/blog images/events images/backgrounds images/press images/developer images/attendees images/icons

# Download background images
curl "https://source.unsplash.com/1920x1080/?library,books" -o images/backgrounds/hero-bg.jpg
curl "https://source.unsplash.com/1920x600/?author,writing" -o images/backgrounds/about-hero.jpg
curl "https://source.unsplash.com/1920x600/?bookshelf" -o images/backgrounds/books-hero.jpg
curl "https://source.unsplash.com/1920x600/?typewriter" -o images/backgrounds/blog-hero.jpg
curl "https://source.unsplash.com/1920x600/?auditorium" -o images/backgrounds/events-hero.jpg
curl "https://source.unsplash.com/1920x600/?press,interview" -o images/backgrounds/press-hero.jpg
curl "https://source.unsplash.com/1920x600/?coding,developer" -o images/backgrounds/developer-hero.jpg

# Download author images
curl "https://source.unsplash.com/600x600/?portrait,man" -o images/author/author-photo.jpg
curl "https://source.unsplash.com/800x1200/?portrait,professional" -o images/author/author-professional.jpg
curl "https://source.unsplash.com/800x1200/?casual,portrait" -o images/author/author-casual.jpg
curl "https://source.unsplash.com/1200x800/?writing,desk" -o images/author/author-writing.jpg

# Download book cover images
curl "https://via.placeholder.com/600x900/3a506b/ffffff?text=The+Hidden+Path" -o images/books/latest-book.jpg
curl "https://via.placeholder.com/600x900/5bc0be/ffffff?text=Book+Title+1" -o images/books/book1.jpg
curl "https://via.placeholder.com/600x900/e76f51/ffffff?text=Book+Title+2" -o images/books/book2.jpg
curl "https://via.placeholder.com/600x900/1c2541/ffffff?text=Book+Title+3" -o images/books/book3.jpg
curl "https://via.placeholder.com/600x900/f4a261/ffffff?text=Book+Title+4" -o images/books/book4.jpg
curl "https://via.placeholder.com/800x500/3a506b/ffffff?text=Book+Series" -o images/books/book-series1.jpg

# Download blog images
curl "https://source.unsplash.com/1200x800/?writing" -o images/blog/blog-featured.jpg
curl "https://source.unsplash.com/800x500/?books,1" -o images/blog/blog-post1.jpg
curl "https://source.unsplash.com/800x500/?writing,2" -o images/blog/blog-post2.jpg
curl "https://source.unsplash.com/800x500/?library,3" -o images/blog/blog-post3.jpg
curl "https://source.unsplash.com/800x500/?typewriter,4" -o images/blog/blog-post4.jpg
curl "https://source.unsplash.com/800x500/?bookstore,5" -o images/blog/blog-post5.jpg
curl "https://source.unsplash.com/800x500/?author,6" -o images/blog/blog-post6.jpg

# Download event images
curl "https://source.unsplash.com/1200x800/?event,bookstore" -o images/events/featured-event.jpg
curl "https://source.unsplash.com/800x500/?literary,festival" -o images/events/event1.jpg
curl "https://source.unsplash.com/800x500/?book,signing" -o images/events/event2.jpg
curl "https://source.unsplash.com/800x500/?workshop,writing" -o images/events/event3.jpg
curl "https://source.unsplash.com/800x500/?conference,author" -o images/events/past-event1.jpg
curl "https://source.unsplash.com/800x500/?reading,public" -o images/events/past-event2.jpg

# Download attendee images
curl "https://randomuser.me/api/portraits/men/1.jpg" -o images/attendees/attendee1.jpg
curl "https://randomuser.me/api/portraits/women/1.jpg" -o images/attendees/attendee2.jpg
curl "https://randomuser.me/api/portraits/men/2.jpg" -o images/attendees/attendee3.jpg
curl "https://randomuser.me/api/portraits/women/2.jpg" -o images/attendees/attendee4.jpg
curl "https://randomuser.me/api/portraits/men/3.jpg" -o images/attendees/attendee5.jpg
curl "https://randomuser.me/api/portraits/women/3.jpg" -o images/attendees/attendee6.jpg

# Download press images
curl "https://source.unsplash.com/800x1200/?portrait,professional" -o images/press/press-photo1.jpg
curl "https://source.unsplash.com/800x1200/?author,interview" -o images/press/press-photo2.jpg
curl "https://source.unsplash.com/1200x800/?press,conference" -o images/press/press-photo3.jpg
curl "https://via.placeholder.com/200x100/3a506b/ffffff?text=Media+1" -o images/press/media-logo1.png
curl "https://via.placeholder.com/200x100/5bc0be/ffffff?text=Media+2" -o images/press/media-logo2.png
curl "https://via.placeholder.com/200x100/e76f51/ffffff?text=Media+3" -o images/press/media-logo3.png
curl "https://via.placeholder.com/200x100/1c2541/ffffff?text=Media+4" -o images/press/media-logo4.png

# Download developer images
curl "https://source.unsplash.com/400x400/?developer,portrait" -o images/developer/developer-photo.jpg
curl "https://source.unsplash.com/600x400/?website,design" -o images/developer/project1.jpg
curl "https://source.unsplash.com/600x400/?coding,computer" -o images/developer/project2.jpg
curl "https://source.unsplash.com/600x400/?app,development" -o images/developer/project3.jpg

# Download icons and other images
curl "https://via.placeholder.com/32x32/3a506b/ffffff?text=P" -o images/icons/favicon.ico
curl "https://via.placeholder.com/200x50/3a506b/ffffff?text=Prabhat+Singh" -o images/icons/logo.png
curl "https://source.unsplash.com/1200x630/?books,author" -o images/icons/social-preview.jpg
curl "https://via.placeholder.com/180x180/3a506b/ffffff?text=PS" -o images/icons/apple-touch-icon.png

# Create a signature image
curl "https://via.placeholder.com/400x200/ffffff/3a506b?text=Prabhat+Singh+Signature" -o images/author/author-signature.png

echo "All placeholder images have been downloaded successfully!"
