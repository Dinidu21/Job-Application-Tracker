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

                {/* Trust Indicators */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Trusted by teams at
                  </p>
                  <div className="flex flex-wrap items-center gap-6 opacity-70">
                    {['Google', 'Microsoft', 'Airbnb', 'Stripe', 'Spotify'].map((company) => (
                      <div
                        key={company}
                        className="text-lg font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                      >
                        {company}
                      </div>
                    ))}
                  </div>
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

      {/* Social Proof Section */}
      <section id="testimonials" className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-6 py-3">
                <Users className="h-5 w-5" />
                <span className="text-lg font-semibold">
                  Over <span className="font-bold">50,000</span> successful job hunters use JobPath
                </span>
              </div>
              <h2 className="mb-4 text-3xl font-bold">Why Trust Us?</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 interactive-hover">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 scale-hover" />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-400 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
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
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
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
