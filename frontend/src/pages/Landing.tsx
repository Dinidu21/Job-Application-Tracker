import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import ThemeToggle from '../components/ThemeToggle';
import Marquee from '../components/ui/Marquee';
import { useTheme } from '../contexts/ThemeContext';
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
  Target,
} from 'lucide-react';

const Landing = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const features = [
    {
      icon: Sparkles,
      title: 'AI Resume Feedback',
      description:
        'Get instant, targeted suggestions to improve your resume score for any job listing.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Pipeline Visualization',
      description:
        'Drag-and-drop Kanban board view of every application status: Applied, Interview, Offer, Rejected.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Mail,
      title: 'Automated Follow-ups',
      description:
        'Schedule and send personalized follow-up emails right from the app, ensuring you never miss a touchpoint.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: FileText,
      title: 'Interview Prep Hub',
      description:
        'Dedicated space to store notes, common questions, and company research for upcoming interviews.',
      gradient: 'from-violet-500 to-purple-500',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      content:
        'Tracker Pro transformed my job search. The AI feedback helped me land 3 interviews in one week!',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Product Manager',
      content:
        'The pipeline view is a game-changer. I can see exactly where I am with each application at a glance.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content:
        'Automated follow-ups saved me hours. I never miss a touchpoint anymore, and my response rate doubled.',
      rating: 5,
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      content:
        'The interview prep hub is incredible. Having all my notes and research in one place made interviews so much easier.',
      rating: 5,
    },
    {
      name: 'Lisa Wang',
      role: 'UX Designer',
      content:
        'I love how organized everything is. The visual pipeline helps me prioritize which applications to follow up on.',
      rating: 5,
    },
    {
      name: 'James Taylor',
      role: 'DevOps Engineer',
      content:
        'Best investment I made in my job search. The automated reminders ensure I never miss a deadline.',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Track up to 10 jobs',
        'Basic pipeline view',
        'Email reminders',
        'Mobile app access',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For serious job hunters',
      features: [
        'Unlimited job tracking',
        'AI Resume Feedback',
        'Automated Follow-ups',
        'Interview Prep Hub',
        'Advanced analytics',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Business',
      price: '$49',
      period: 'per month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared pipelines',
        'Custom workflows',
        'Dedicated support',
        'API access',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:bg-[#0a0a0a] text-foreground">
      {/* Ambient glow background - theme aware */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-pulse ${
            isDark
              ? 'bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20'
              : 'bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10'
          }`}
        />
        <div
          className={`absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${
            isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'
          }`}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link
              to="/"
              className="group flex items-center gap-3 text-2xl font-bold transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 transition-all duration-200 group-hover:shadow-xl group-hover:shadow-primary/30">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                JobPath
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                Testimonials
              </a>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-3">
                <Button asChild variant="ghost">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40">
                  <Link to="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 lg:py-40">
        <div className="container mx-auto">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm cursor-glow hover-glow">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Job Search Platform</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-foreground">Master Your Search.</span>
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Land the Job.
              </span>
            </h1>

            <p className="mb-12 text-xl text-muted-foreground sm:text-2xl max-w-3xl mx-auto">
              The definitive, AI-powered tool to organize, track, and optimize every stage of your
              job application journey.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group cursor-glow hover-glow shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 px-8 py-6 text-lg"
              >
                <Link to="/register">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="cursor-glow hover-glow px-8 py-6 text-lg"
              >
                <Link to="/login">Book a Demo</Link>
              </Button>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="mt-16 relative">
              <Card
                variant="glass"
                className="relative mx-auto max-w-4xl p-8 shadow-2xl"
              >
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
                    >
                      <div className="mb-3 h-3 w-20 rounded-full bg-gradient-to-r from-primary to-purple-600" />
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-muted" />
                        <div className="h-2 w-3/4 rounded-full bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to transform your job search into a strategic, organized
              process.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  variant="glass"
                  className="group relative overflow-hidden cursor-glow hover-glow magnetic-hover animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  />
                  <div className="relative">
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="relative px-4 py-20 sm:py-32">
        <div className="container mx-auto">
          <Card variant="glass" className="mx-auto max-w-4xl p-12">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold text-foreground">
                  Over <span className="text-primary">50,000</span> successful job hunters use
                  JobPath
                </span>
              </div>
              <h2 className="mb-4 text-4xl font-bold">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Why Trust Us?
                </span>
              </h2>
            </div>

            <Marquee speed="normal" pauseOnHover className="py-4">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={`${testimonial.name}-${index}`}
                  variant="outlined"
                  className="min-w-[320px] p-6 cursor-glow hover-glow"
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </Card>
              ))}
            </Marquee>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative px-4 py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your job search journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card
                key={plan.name}
                variant={plan.popular ? 'glass' : 'outlined'}
                className={`relative p-8 cursor-glow hover-glow magnetic-hover ${
                  plan.popular
                    ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-105'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-primary/50 bg-primary/20 px-4 py-1 text-sm font-semibold text-primary backdrop-blur-sm">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  fullWidth
                  variant={plan.popular ? 'default' : 'outline'}
                  className={`cursor-glow hover-glow ${
                    plan.popular ? 'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40' : ''
                  }`}
                >
                  <Link to="/register">{plan.cta}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative px-4 py-20 sm:py-32">
        <div className="container mx-auto">
          <Card variant="glass" className="mx-auto max-w-4xl p-12 text-center sm:p-16">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/20 p-3">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Stop Guessing. Start Organizing.
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Join thousands who turned chaos into career success.
            </p>
            <Button
              asChild
              size="lg"
              className="group cursor-glow hover-glow shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 px-8 py-6 text-lg"
            >
              <Link to="/register">
                Sign Up for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/40 bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">JobPath</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The modern way to track and manage your job applications.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#about"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Get Started</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/register"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <a
                    href="#docs"
                    className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border/40 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} JobPath. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a
                  href="#privacy"
                  className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Privacy
                </a>
                <a
                  href="#terms"
                  className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
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
