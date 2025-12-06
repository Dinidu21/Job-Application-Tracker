import{c as s,B as p,a as i,T as o,A as d}from"./ThemeToggle-D8kry2uQ.js";import{b as y,d as g,u as b,r as f,j as e,L as t,o as j}from"./index-BcebRXqZ.js";/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=s("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=s("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=s("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=s("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=s("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=s("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=s("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),L=()=>{const h=y(),m=g(),{user:a}=b(u=>u.auth),[r,n]=f.useState(!1),l=()=>{h(j()),m("/login"),n(!1)};return e.jsx("header",{className:"sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:e.jsxs("nav",{className:"container mx-auto px-4","aria-label":"Main navigation",children:[e.jsxs("div",{className:"flex h-16 items-center justify-between",children:[e.jsxs(t,{to:"/dashboard",className:"group flex items-center gap-3 text-xl font-bold transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg","aria-label":"Job Tracker - Home",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 transition-all duration-200 group-hover:shadow-xl group-hover:shadow-primary/30",children:e.jsx(p,{className:"h-5 w-5 text-primary-foreground","aria-hidden":"true"})}),e.jsx("span",{className:"bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",children:"Job Tracker"})]}),e.jsxs("div",{className:"hidden md:flex items-center gap-3",children:[e.jsx(i,{asChild:!0,variant:"default",size:"default",children:e.jsxs(t,{to:"/applications/new",children:[e.jsx(x,{className:"mr-2 h-4 w-4","aria-hidden":"true"}),"New Application"]})}),e.jsxs("div",{className:"ml-2 flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-3 py-2 backdrop-blur-sm",children:[e.jsx(o,{}),e.jsx(d,{fallback:(a==null?void 0:a.name)||"U",size:"sm"}),e.jsx("span",{className:"text-sm font-medium text-foreground",children:a==null?void 0:a.name}),e.jsxs(i,{variant:"ghost",size:"sm",onClick:l,"aria-label":"Logout",children:[e.jsx(c,{className:"mr-2 h-4 w-4","aria-hidden":"true"}),e.jsx("span",{className:"hidden lg:inline",children:"Logout"})]})]})]}),e.jsx(i,{variant:"ghost",size:"icon",className:"md:hidden",onClick:()=>n(!r),"aria-label":"Toggle menu","aria-expanded":r,children:r?e.jsx(N,{className:"h-5 w-5","aria-hidden":"true"}):e.jsx(k,{className:"h-5 w-5","aria-hidden":"true"})})]}),r&&e.jsx("div",{className:"md:hidden border-t border-border/40 py-4 animate-slide-up",role:"menu",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(i,{asChild:!0,variant:"default",fullWidth:!0,className:"justify-start",children:e.jsxs(t,{to:"/applications/new",onClick:()=>n(!1),children:[e.jsx(x,{className:"mr-2 h-4 w-4","aria-hidden":"true"}),"New Application"]})}),e.jsxs("div",{className:"flex items-center justify-between px-2 py-2",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(d,{fallback:(a==null?void 0:a.name)||"U",size:"sm"}),e.jsx("span",{className:"text-sm font-medium text-foreground",children:a==null?void 0:a.name})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(o,{}),e.jsx(i,{variant:"ghost",size:"icon",onClick:l,"aria-label":"Logout",children:e.jsx(c,{className:"h-4 w-4","aria-hidden":"true"})})]})]})]})})]})})};export{M as C,z as D,C as M,L as N};
