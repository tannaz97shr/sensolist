import initTranslations from "@/app/i18n";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import ProtectRoute from "@/components/ProtectRoute";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["default"];

export default async function AuthLayout({
  children,
  params: { locale }, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <ProtectRoute>
      <TranslationsProvider
        locale={locale}
        resources={resources}
        namespaces={i18nNamespaces}
      >
        <div className="flex flex-col dark:bg-dark-background-color min-h-[100vh] overflow-hidden">
          <Header />
          <div className=" relative h-full lg:mb-4 flex-1 flex flex-col">
            <Menu />
            <div
              className=" h-full lg:ml-[120px] flex-1 text-primary-Shade-1 lg:pb-0 md:ml-[100px] flex flex-col mb-[64px] md:mb-2
          md:mt-[100px] lg:mt-[120px]"
            >
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </TranslationsProvider>
    </ProtectRoute>
  );
}
