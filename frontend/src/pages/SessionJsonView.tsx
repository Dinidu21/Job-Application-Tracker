import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Button } from '../components/ui';
import { ArrowLeft, Copy, Check } from 'lucide-react';

const SessionJsonView: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const [copied, setCopied] = React.useState(false);

    // Retrieve session data from location state
    const sessionData = location.state?.sessionData;

    const handleCopy = () => {
        if (sessionData) {
            navigator.clipboard.writeText(JSON.stringify(sessionData, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!sessionData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="w-full max-w-md p-6 text-center">
                    <h2 className="text-xl font-semibold mb-2">No Data Available</h2>
                    <p className="text-muted-foreground mb-4">
                        This page expects session data to be passed from the Admin Dashboard.
                    </p>
                    <Button onClick={() => navigate('/admin')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigate('/admin')}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Session Details</h1>
                            <p className="text-muted-foreground">ID: {sessionId}</p>
                        </div>
                    </div>
                    <Button onClick={handleCopy} variant="outline" className="gap-2">
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied' : 'Copy JSON'}
                    </Button>
                </div>

                <Card className="bg-card">
                    <CardContent className="p-0">
                        <div className="bg-muted/30 p-4 rounded-lg overflow-x-auto">
                            <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                                {JSON.stringify(sessionData, null, 2)}
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SessionJsonView;
