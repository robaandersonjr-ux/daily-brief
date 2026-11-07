import { Link } from "react-router";

const UPDATED = "November 6, 2026";
const CONTACT = "robert@robertandersonux.com";

export function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-md mx-auto px-6 py-10 space-y-6 text-white/70 text-[15px] leading-relaxed">
        <Link to="/" className="text-sm text-white/50 hover:text-white/80">
          ← Daily Brief
        </Link>
        <div className="space-y-1">
          <h1 className="text-[28px] text-white font-light">Privacy Policy</h1>
          <p className="text-sm text-white/40">Last updated {UPDATED}</p>
        </div>

        <p>
          Daily Brief is made by Robert Anderson. This policy covers the Daily Brief app for iOS
          and Android and the website at daily-brief-olive.vercel.app.
        </p>

        <section className="space-y-2">
          <h2 className="text-white text-lg">What the app stores</h2>
          <p>
            Your name, your intentions, check-ins, reflections and reminder times. All of it is
            stored only on your device. It is never sent to us or anyone else.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-white text-lg">What we collect</h2>
          <p>
            Nothing. Daily Brief has no accounts, no analytics, no advertising and no tracking. We
            do not sell or share any data, because we never receive any.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-white text-lg">Notifications</h2>
          <p>
            If you allow notifications, reminders are scheduled on your device by your phone's
            operating system. No server is involved. You can change or turn them off in the app or
            in your phone's settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-white text-lg">Deleting your data</h2>
          <p>
            Uninstalling the app deletes everything it stored. On the website, clearing your
            browser's site data does the same.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-white text-lg">Children</h2>
          <p>Daily Brief is not directed at children under 13 and collects no data from anyone.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-white text-lg">Changes and contact</h2>
          <p>
            If this policy changes, the new version will be posted here with a new date. Questions:{" "}
            <a href={`mailto:${CONTACT}`} className="text-[#5271FF]">
              {CONTACT}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
