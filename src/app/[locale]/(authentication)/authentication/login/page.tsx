import initTranslations from "@/app/i18n";
import LoginForm from "@/components/authentication/LoginForm";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["default"];

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <LoginForm />
    </TranslationsProvider>
  );
}
