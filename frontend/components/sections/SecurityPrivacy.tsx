import { Shield, Lock, FileCheck, ArrowRight } from "lucide-react";

export default function SecurityPrivacy() {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance">We keep your <span className="text-orange-500">data safe</span></h2>
            <p className="mt-4 text-gray-600">At Aragon, security and privacy {"aren't"} just afterthoughts. Your data deserves the best protection. We use AES-256 encryption to ensure that your data is safe with us.</p>
            <p className="mt-6 font-semibold text-foreground">Our team comes from:</p>
            <div className="mt-4 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
                <div className="h-6 w-6 rounded bg-gradient-to-r from-blue-500 to-red-500"></div>
                <span className="font-semibold text-foreground">Google</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
                <div className="h-6 w-6 rounded bg-blue-600"></div>
                <span className="font-semibold text-foreground">Meta</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
                <div className="h-6 w-6 rounded bg-gradient-to-r from-orange-500 to-green-500"></div>
                <span className="font-semibold text-foreground">Microsoft</span>
              </div>
            </div>
            <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Shield className="h-5 w-5 text-orange-500" />
                </div>
                <span className="text-lg font-bold text-foreground">We are SOC 2 Type II certified</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Built to the highest security standards. Visit our Trust Center for the latest updates.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Lock className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{"You're in control"}</h3>
              </div>
              <p className="mt-2 text-gray-600">As a paid product, Aragon will never use your photos to train any AI model without your permission.</p>
              <a href="/privacy" className="mt-4 inline-flex items-center text-orange-600 font-semibold hover:underline">
                View our Privacy Policy <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <FileCheck className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Security built for Fortune 500 companies</h3>
              </div>
              <p className="mt-2 text-gray-600">Built to the highest security standards, we are SOC 2 Type II certified.</p>
              <a href="/security" className="mt-4 inline-flex items-center text-orange-600 font-semibold hover:underline">
                View our Security Policy <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
