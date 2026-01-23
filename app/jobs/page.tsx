import ClientBrowseJobs from "./ClientBrowseJobs";

type pageProps = {
    searchParams: Record<string, string | string[] | undefined>;
}

export default async function Page({ searchParams }: pageProps) {
    const params = await searchParams;
    const page = Number(params.page ?? 1);
    return <ClientBrowseJobs page={page} />
}