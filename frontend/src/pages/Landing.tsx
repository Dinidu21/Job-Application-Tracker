import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import ThemeToggle from '../components/ThemeToggle';
import {
  Briefcase,
  Sparkles,
  BarChart3,
  Mail,
  FileText,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Play,
} from 'lucide-react';
import CountUp from 'react-countup';

const Landing = () => {

  const features = [
    {
      icon: Sparkles,
      title: 'AI Resume Feedback',
      description: 'Get instant, targeted suggestions to improve your resume score for any job listing.',
    },
    {
      icon: BarChart3,
      title: 'Pipeline Visualization',
      description: 'Drag-and-drop Kanban board view of every application status: Applied, Interview, Offer, Rejected.',
    },
    {
      icon: Mail,
      title: 'Automated Follow-ups',
      description: 'Schedule and send personalized follow-up emails right from the app, ensuring you never miss a touchpoint.',
    },
    {
      icon: FileText,
      title: 'Interview Prep Hub',
      description: 'Dedicated space to store notes, common questions, and company research for upcoming interviews.',
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Data Scientist',
      content: 'Using JobPath, I organized my job applications and improved my resume with AI feedback. Landed 3 interviews in 2 weeks!',
      rating: 5,
    },
    {
      name: 'Alex Johnson',
      role: 'UX Designer',
      content: 'JobPath saved me 20+ hours per week. The AI resume feedback was spot on and helped me get 4 interviews in one week!',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      content: 'Tracker Pro transformed my job search. The AI feedback helped me land 3 interviews in one week!',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Product Manager',
      content: 'The pipeline view is a game-changer. I can see exactly where I am with each application at a glance.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content: 'Automated follow-ups saved me hours. I never miss a touchpoint anymore, and my response rate doubled.',
      rating: 5,
    },
    {
      name: 'David Kim',
      role: 'Financial Analyst',
      content: 'The interview prep hub is fantastic. I can store all my notes and research in one place, making interviews much easier.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Briefcase className="h-6 w-6" />
              JobPath
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Features
              </a>
              <a href="#pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Pricing
              </a>
              <a href="#testimonials" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Testimonials
              </a>
              <a href="#companies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Companies
              </a>
              <a href="#contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container mx-auto relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="lg:w-1/2 text-left animate-fade-in">
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 text-sm hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <Sparkles className="h-4 w-4 animate-spin-slow" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                  <span className="font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    AI-Powered Job Search Platform
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block bg-gradient-to-r from-foreground to-gray-500 bg-clip-text text-transparent">
                    Master Your Job
                  </span>
                  <span className="block mt-2">
                    <span className="relative">
                      <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                        Search Journey
                      </span>
                      <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient-x" />
                    </span>
                  </span>
                </h1>

                <p className="mb-8 text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  The definitive, AI-powered platform to organize, track, and optimize every stage of your
                  <span className="font-semibold text-primary mx-1">Job Application Journey</span>
                  with smart automation and predictive insights.
                </p>

                {/* Stats */}
                <div className="mb-10 flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        <CountUp end={50000} duration={2} separator="," />+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Job Hunters</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-500/10 p-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        <CountUp end={87} duration={2} suffix="%" />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-500/10 p-2">
                      <Briefcase className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        <CountUp start={0} end={2.5} decimals={1} duration={2} />
                        <span className="font-normal">x</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Faster Hires</div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="relative px-8 group overflow-hidden"
                  >
                    <Link to="/register">
                      <span className="relative z-10 flex items-center">
                        Start Tracking Free
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 group-hover:from-purple-600 group-hover:to-primary transition-all duration-300" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="px-8 group border-2 hover:border-primary hover:bg-primary/5"
                  >
                    <Link to="/login" className="flex items-center gap-2">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-lg bg-primary/20 blur group-hover:bg-primary/40 transition-all" />
                        <Play className="h-5 w-5 relative z-10" />
                      </div>
                      Watch Demo (2 min)
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Side - Interactive Preview */}
              <div className="lg:w-1/2 relative">
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-2xl animate-float">
                  {/* Main Preview Content */}
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Live Dashboard Preview
                      </div>
                    </div>

                    {/* Mock Kanban Board */}
                    <div className="space-y-4">
                      {[
                        { title: 'Applied', count: 12, color: 'bg-blue-500' },
                        { title: 'Interview', count: 4, color: 'bg-yellow-500' },
                        { title: 'Offer', count: 2, color: 'bg-green-500' },
                        { title: 'Rejected', count: 6, color: 'bg-red-500' }
                      ].map((column) => (
                        <div key={column.title} className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:translate-x-2 transition-transform duration-300">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${column.color}`} />
                            <span className="font-medium">{column.title}</span>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-white dark:bg-gray-900 text-sm font-bold">
                            {column.count}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Assistant Preview */}
                    <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-medium">AI Assistant</div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        "Your resume score increased by 32%! Ready to apply to 3 new matching jobs."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" aria-label="Success stories from our users" className="py-20 sm:py-32 bg-gradient-to-b from-background to-gray-50/30 dark:to-gray-900/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-primary">5.0 Average Rating</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Join <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">50,000+</span> Successful Job Hunters
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Don't just take our word for it. See how JobPath transformed careers across industries.
            </p>
          </div>

          {/* Infinite Scroll Testimonials Carousel */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-gray-50/50 dark:from-gray-900/80 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
            {/* Gradient Fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-20" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-20" />

            {/* Top Row - Right to Left */}
            <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
              <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                {testimonials.map((testimonial, index) => (
                  <figure
                    key={`top-${index}`}
                    className="relative w-80 cursor-pointer overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 p-6 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-900/80 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-row items-center gap-3 mb-4">
                      <img
                        className="rounded-full border-2 border-primary/20"
                        width="44"
                        height="44"
                        alt={testimonial.name}
                        src={`https://images.unsplash.com/photo-${['1573496359142-b8d87734a5a2', '1544725176-7c40e5a71c5e', '1534528741775-53994a69daeb'][index % 3]}?auto=format&fit=crop&w=100&q=80`} />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-semibold text-foreground">{testimonial.name}</figcaption>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <Briefcase className="h-3 w-3" />
                      <span>Hired at {['Google', 'Microsoft', 'Spotify'][index % 3]}</span>
                    </div>
                  </figure>
                ))}
              </div>
              <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                {testimonials.map((testimonial, index) => (
                  <figure
                    key={`top-dup-${index}`}
                    className="relative w-80 cursor-pointer overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 p-6 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-900/80 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-row items-center gap-3 mb-4">
                      <img
                        className="rounded-full border-2 border-primary/20"
                        width="44"
                        height="44"
                        alt={testimonial.name}
                        src={`https://images.unsplash.com/photo-${['1508214751196-bcfd4ca60f91', '1517841905240-472988babdf9', '1519085360753-af0119f7cbe7'][index % 3]}?auto=format&fit=crop&w=100&q=80`}
                      />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-semibold text-foreground">{testimonial.name}</figcaption>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <Briefcase className="h-3 w-3" />
                      <span>Hired at {['Amazon', 'Apple', 'Netflix', 'Tesla', 'Meta'][index % 5]}</span>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
            {/* CTA */}
            <div className="mt-16 text-center">
              <Button asChild size="lg" className="px-8 group">
                <Link to="/register">
                  <Users className="mr-2 h-5 w-5" />
                  Join Our Community
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Marquee Section */}
      <section id="companies" className="py-16 sm:py-24 bg-gradient-to-b from-background via-background to-gray-50/20 dark:to-gray-900/20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Trusted by Top Companies</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Where Our Users Get Hired
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              JobPath users land roles at the world's most innovative companies
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative max-w-6xl mx-auto opacity-90 dark:opacity-70 overflow-hidden 
            before:content-[''] before:absolute before:inset-0 before:w-full 
            before:bg-[linear-gradient(to_right,var(--background)_0%,transparent_10%,transparent_90%,var(--background)_100%)] 
            before:z-10">

            {/* Top Marquee - Left to Right */}
            <div className="flex flex-nowrap gap-8 lg:gap-12 py-4 group">
              <div className="flex shrink-0 justify-around gap-8 lg:gap-12 animate-[marquee_40s_linear_infinite] 
                group-hover:[animation-play-state:paused] will-change-transform">
                {[
                  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
                  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
                  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
                  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
                  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
                  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
                  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Uber_logo_2018.svg' },
                ].map((company, index) => (
                  <div key={`top-${index}`} className="h-12 lg:h-14 w-auto flex items-center justify-center group/item">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 lg:h-10 w-auto opacity-60 hover:opacity-100 
                        grayscale hover:grayscale-0 transition-all duration-300 
                        group-hover/item:scale-110"
                      draggable="false"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.replaceWith(
                          Object.assign(document.createElement("div"), {
                            className: "text-2xl font-bold text-gray-400",
                            textContent: company.name,
                          })
                        );
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate for seamless loop */}
              <div className="flex shrink-0 justify-around gap-8 lg:gap-12 animate-[marquee_40s_linear_infinite] 
                group-hover:[animation-play-state:paused] will-change-transform">
                {[
                  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
                  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
                  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
                  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
                  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
                  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
                  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Uber_logo_2018.svg' },
                ].map((company, index) => (
                  <div key={`top-dup-${index}`} className="h-12 lg:h-14 w-auto flex items-center justify-center group/item">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 lg:h-10 w-auto opacity-60 hover:opacity-100 
                        grayscale hover:grayscale-0 transition-all duration-300 
                        group-hover/item:scale-110"
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Marquee - Right to Left (Reverse) */}
            <div className="flex flex-nowrap gap-8 lg:gap-12 py-4 group mt-8">
              <div className="flex shrink-0 justify-around gap-8 lg:gap-12 animate-[marquee_45s_linear_infinite_reverse] 
                group-hover:[animation-play-state:paused] will-change-transform">
                {[
                  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
                  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
                  { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
                  { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
                  { name: 'Zoom', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg' },
                  { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/1024px-Adobe_Corporate_logo.svg.png?20220820114255' },
                  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
                  { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
                  { name: 'GitHub', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
                ].map((company, index) => (
                  <div key={`bottom-${index}`} className="h-12 lg:h-14 w-auto flex items-center justify-center group/item">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 lg:h-10 w-auto opacity-60 hover:opacity-100 
                        grayscale hover:grayscale-0 transition-all duration-300 
                        group-hover/item:scale-110"
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate for seamless loop */}
              <div className="flex shrink-0 justify-around gap-8 lg:gap-12 animate-[marquee_45s_linear_infinite_reverse] 
                group-hover:[animation-play-state:paused] will-change-transform">
                {[
                  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
                  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
                  { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
                  { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
                  { name: 'Zoom', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg' },
                  { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Adobe_Corporate_logo.svg' },
                  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
                  { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
                  { name: 'GitHub', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
                ].map((company, index) => (
                  <div key={`bottom-dup-${index}`} className="h-12 lg:h-14 w-auto flex items-center justify-center group/item">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 lg:h-10 w-auto opacity-60 hover:opacity-100 
                        grayscale hover:grayscale-0 transition-all duration-300 
                        group-hover/item:scale-110"
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful features designed to transform your job search into a strategic, organized process.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center card-hover p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 mx-auto scale-hover">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the plan that fits your job search journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 card-hover">
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">Free</h3>
                <p className="text-gray-600 dark:text-gray-400">Perfect for getting started</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600 dark:text-gray-400">/forever</span>
              </div>
              <ul className="mb-8 space-y-3">
                {['Track up to 10 jobs', 'Basic pipeline view', 'Email reminders', 'Mobile app access', 'Community support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 scale-hover" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild fullWidth variant="outline" className="interactive-hover">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>

            <div className="rounded-lg border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black p-8 relative glow-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-medium rounded magnetic">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">Pro</h3>
                <p className="text-gray-300 dark:text-gray-600">For serious job hunters</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-300 dark:text-gray-600">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                {['Unlimited job tracking', 'AI Resume Feedback', 'Automated Follow-ups', 'Interview Prep Hub', 'Advanced analytics', 'Priority support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 scale-hover" />
                    <span className="text-gray-300 dark:text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild fullWidth className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 btn-hover">
                <Link to="/register">Start Free Trial</Link>
              </Button>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 card-hover">
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">Business</h3>
                <p className="text-gray-600 dark:text-gray-400">For teams and agencies</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                {['Everything in Pro', 'Team collaboration', 'Shared pipelines', 'Custom workflows', 'Dedicated support', 'API access'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 scale-hover" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild fullWidth variant="outline" className="interactive-hover">
                <Link to="/register">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Stop Guessing. Start Organizing.
            </h2>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
              Join thousands who turned chaos into career success.
            </p>
            <Button asChild size="lg" className="px-8 btn-hover">
              <Link to="/register">
                Sign Up for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">

          {/* 98% */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              <CountUp end={98} duration={2} enableScrollSpy scrollSpyOnce />%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Job Satisfaction</div>
          </div>

          {/* 4.7/5 */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              <CountUp end={4.7} decimals={1} duration={2} enableScrollSpy scrollSpyOnce />/5
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Platform Rating</div>
          </div>

          {/* 2.1x */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
              <CountUp end={2.1} decimals={1} duration={2} enableScrollSpy scrollSpyOnce />x
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Faster Hires</div>
          </div>

          {/* 50K+ */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              <CountUp end={50000} separator="," duration={2} enableScrollSpy scrollSpyOnce />+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Users Trust Us</div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-lg font-bold">JobPath</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The modern way to track and manage your job applications.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#features" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Pricing
                  </a>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#about" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    About
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Get Started</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link to="/register" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Sign In
                  </Link>
                </li>
                <li>
                  <a href="#docs" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} JobPath. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <a href="#privacy" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                  Privacy
                </a>
                <a href="#terms" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
