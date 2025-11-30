import React from 'react';
import Button from './ui/Button';
import { Card } from './ui/Card';

const HoverEffectsDemo: React.FC = () => {
    return (
        <div className="p-8 space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Modern Hover Effects Demo</h2>
                <p className="text-muted-foreground">
                    Experience the beautiful modern hover effects applied to various elements
                </p>
            </div>

            {/* Button Effects */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Button Effects</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="btn-hover">Shimmer Button</Button>
                    <Button className="magnetic">Magnetic Scale</Button>
                    <Button className="ripple">Ripple Effect</Button>
                </div>
            </div>

            {/* Card Effects */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Card Effects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="card-hover p-6">
                        <h4 className="text-xl font-semibold mb-2">Card Hover Effect</h4>
                        <p className="text-muted-foreground">
                            This card features a sophisticated hover effect with elevation and gradient overlay.
                        </p>
                    </Card>
                    <Card className="glow-primary p-6">
                        <h4 className="text-xl font-semibold mb-2">Glow Effect</h4>
                        <p className="text-muted-foreground">
                            This card has a beautiful glow effect that activates on hover.
                        </p>
                    </Card>
                </div>
            </div>

            {/* Interactive Elements */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Interactive Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="interactive-hover p-4 bg-secondary rounded-lg text-center">
                        Interactive Hover
                    </div>
                    <div className="scale-hover p-4 bg-secondary rounded-lg text-center">
                        Scale Hover
                    </div>
                    <div className="float-hover p-4 bg-secondary rounded-lg text-center">
                        Float Hover
                    </div>
                    <div className="rotate-hover p-4 bg-secondary rounded-lg text-center">
                        Rotate Hover
                    </div>
                </div>
            </div>

            {/* Link Effects */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Link Effects</h3>
                <div className="space-y-2">
                    <a href="#" className="link-hover block text-primary">
                        This is a link with modern underline effect
                    </a>
                    <a href="#" className="link-hover block text-primary">
                        Another link with the same hover effect
                    </a>
                </div>
            </div>

            {/* Combined Effects */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Combined Effects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="cursor-glow hover-glow magnetic-hover p-6">
                        <h4 className="text-xl font-semibold mb-2">Triple Effect</h4>
                        <p className="text-muted-foreground">
                            This card combines cursor glow, hover glow, and magnetic effects.
                        </p>
                    </Card>
                    <Button className="btn-hover shimmer magnetic p-6 h-auto">
                        <div className="text-center">
                            <h4 className="text-lg font-semibold mb-1">Complex Button</h4>
                            <p className="text-sm opacity-90">With shimmer and magnetic effects</p>
                        </div>
                    </Button>
                </div>
            </div>

            {/* Input Effects */}
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Input Effects</h3>
                <div className="max-w-md">
                    <input
                        type="text"
                        placeholder="Focus to see hover effect"
                        className="input-hover w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                </div>
            </div>
        </div>
    );
};

export default HoverEffectsDemo;