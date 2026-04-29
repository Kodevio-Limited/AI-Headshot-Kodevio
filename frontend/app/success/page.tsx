"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, Mail, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getJobStatus } from "@/lib/api/generation";

export default function SuccessPage() {
  const [paymentStatus, setPaymentStatus] = useState<string>("PENDING");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("job_id");
      setJobId(id);
      if (!id) {
        setIsLoading(false);
        setError("No job ID found in the URL.");
      }
    }
  }, []);

  useEffect(() => {
    if (!jobId) return;

    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    let currentInterval = 2000;
    let elapsed = 0;
    const MAX_POLL_TIME = 120000; // 2 minutes

    const pollJobStatus = async () => {
      try {
        const job = await getJobStatus(parseInt(jobId));
        if (!isMounted) return;

        if (job.payment_status === "PAID") {
          setPaymentStatus("PAID");
          setIsLoading(false);
        } else {
          elapsed += currentInterval;
          if (elapsed >= MAX_POLL_TIME) {
            setIsLoading(false);
            setError("Verification is taking longer than expected. Don't worry, we are processing your order!");
            return;
          }

          // Exponential backoff: increase interval by 1.5x up to 10s
          currentInterval = Math.min(currentInterval * 1.5, 10000);
          timeoutId = setTimeout(pollJobStatus, currentInterval);
        }
      } catch (err: any) {
        if (!isMounted) return;
        console.error("Error polling job status:", err);
        
        elapsed += currentInterval;
        if (elapsed >= MAX_POLL_TIME) {
          setIsLoading(false);
          setError("Unable to verify payment status. Please check your email for confirmation.");
          return;
        }

        // Retry with longer delay
        currentInterval = Math.min(currentInterval * 2, 10000);
        timeoutId = setTimeout(pollJobStatus, currentInterval);
      }
    };

    setIsLoading(true);
    setError(null);
    pollJobStatus();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [jobId, retryTrigger]);

  const handleRetry = () => {
    setRetryTrigger(prev => prev + 1);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background gradients for aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-2xl -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="max-w-md w-full space-y-8 bg-card border border-border p-8 rounded-2xl shadow-lg text-center relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent animate-spin">
              <Loader2 className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-foreground">Verifying Payment...</h3>
            <p className="text-muted-foreground">We are confirming your payment with Stripe. Please do not close this page.</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20 text-destructive">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-foreground">Notice</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            
            {jobId && (
              <Button 
                onClick={handleRetry}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-4 font-medium transition-all hover:glow-primary"
              >
                Check Status Again
              </Button>
            )}

            <Link href="/" passHref className="w-full block">
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted h-11">
                Return Home
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500 glow-primary border border-green-500/20">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            {/* Text Content */}
            <div className="mt-6">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Payment <span className="text-gradient">Confirmed!</span>
              </h1>
              <p className="mt-4 text-muted-foreground text-pretty">
                Thank you for your purchase. We have received your photos and our AI systems are already getting to work.
              </p>
            </div>

            {/* What's Next Section */}
            <div className="mt-8 border border-border/50 bg-muted/30 rounded-xl p-4 text-left space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" /> What happens next?
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-medium mt-0.5">1</span>
                  <span>We process your photos to train a custom AI model.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-medium mt-0.5">2</span>
                  <span>Our AI generates highly realistic professional headshots.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-medium mt-0.5">3</span>
                  <span className="flex items-center gap-1">
                    You'll receive an email <Mail className="h-3.5 w-3.5 inline mx-0.5" /> when ready (usually takes 10-20 mins).
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Link href="/" passHref>
                <Button className="w-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 hover:glow-primary transition-all h-11 text-base">
                  Return Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
