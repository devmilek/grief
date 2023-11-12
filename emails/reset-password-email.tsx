import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";
import { Container } from "@react-email/container";
import { Body } from "@react-email/body";
import { Link } from "@react-email/link";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";

const baseUrl = process.env.VERCEL_URL
  ? process.env.VERCEL_URL
  : "http://localhost:3000/";

interface ResetPasswordEmailProps {
  token: string;
}

export default function ResetPasswordEmail({ token }: ResetPasswordEmailProps) {
  const confirmationLink = baseUrl + "/forgot-password?token=" + token;
  return (
    <Tailwind>
      <Html className="bg-neutral-100 font-sans">
        <Body className="max-w-lg mx-auto pt-10">
          <Container className="w-full bg-white rounded-xl p-6">
            <Link href={baseUrl}>
              <svg
                className="h-10"
                viewBox="0 0 97 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.50009 17.3374C6.23254 17.0653 5.12026 16.3114 4.3979 15.2348C3.67553 14.1583 3.39956 12.8432 3.62819 11.5671C3.85682 10.291 4.57218 9.15355 5.62337 8.39476C6.67456 7.63596 7.97939 7.31513 9.26259 7.49994C9.57838 6.78324 10.0233 6.13072 10.5751 5.57494C11.1557 4.9929 11.8454 4.53112 12.6047 4.21604C13.364 3.90095 14.178 3.73877 15.0001 3.73877C15.8222 3.73877 16.6362 3.90095 17.3955 4.21604C18.1548 4.53112 18.8445 4.9929 19.4251 5.57494C19.9769 6.13072 20.4218 6.78324 20.7376 7.49994C22.0208 7.31513 23.3256 7.63596 24.3768 8.39476C25.428 9.15355 26.1434 10.291 26.372 11.5671C26.6006 12.8432 26.3247 14.1583 25.6023 15.2348C24.8799 16.3114 23.7676 17.0653 22.5001 17.3374V26.2499H7.50009V17.3374Z"
                  stroke="#4AA267"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 21.25H22.5"
                  stroke="#4AA267"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M86.6685 23.064V22.824L86.9805 22.752C87.2845 22.672 87.5245 22.536 87.7005 22.344C87.8765 22.136 87.9645 21.872 87.9645 21.552C87.9645 20.96 87.9645 20.376 87.9645 19.8C87.9805 19.208 87.9885 18.616 87.9885 18.024V12H86.6445V11.736L87.1725 11.64C87.4925 11.608 87.7245 11.496 87.8685 11.304C88.0125 11.112 88.1165 10.848 88.1805 10.512C88.3405 9.888 88.5725 9.344 88.8765 8.88C89.1965 8.4 89.5565 7.96 89.9565 7.56C90.5645 6.984 91.2045 6.584 91.8765 6.36C92.5645 6.12 93.2365 6 93.8925 6C94.5325 6 95.1165 6.136 95.6445 6.408C96.1725 6.664 96.4365 7.096 96.4365 7.704C96.4365 8.136 96.3085 8.48 96.0525 8.736C95.7965 8.976 95.4365 9.096 94.9725 9.096C94.5885 9.096 94.2365 8.992 93.9165 8.784C93.5965 8.576 93.2845 8.208 92.9805 7.68L92.6445 7.272C92.4685 7.048 92.2925 6.944 92.1165 6.96C91.9405 6.96 91.8125 7.088 91.7325 7.344C91.6205 7.904 91.5325 8.56 91.4685 9.312C91.4205 10.064 91.3965 10.8 91.3965 11.52H94.0845V12H91.3965V21.504C91.3965 22.112 91.7165 22.504 92.3565 22.68L92.9565 22.824V23.064H86.6685Z"
                  fill="black"
                />
                <path
                  d="M80.5742 11.1602C81.6142 11.1602 82.5022 11.3762 83.2382 11.8082C83.9742 12.2242 84.5342 12.8002 84.9182 13.5362C85.3182 14.2562 85.5182 15.0802 85.5182 16.0082C85.5182 16.1842 85.5102 16.3682 85.4942 16.5602C85.4782 16.7362 85.4462 16.8962 85.3982 17.0402H78.2462C78.2622 18.7682 78.5662 20.0162 79.1582 20.7842C79.7662 21.5362 80.6622 21.9122 81.8462 21.9122C82.6462 21.9122 83.2942 21.7842 83.7902 21.5282C84.2862 21.2722 84.7502 20.8962 85.1822 20.4002L85.4222 20.6162C84.9262 21.4962 84.2622 22.1842 83.4302 22.6802C82.6142 23.1762 81.6302 23.4242 80.4782 23.4242C79.3422 23.4242 78.3342 23.1842 77.4542 22.7042C76.5742 22.2082 75.8862 21.5042 75.3902 20.5922C74.8942 19.6802 74.6462 18.5922 74.6462 17.3282C74.6462 16.0162 74.9342 14.9042 75.5102 13.9922C76.0862 13.0642 76.8222 12.3602 77.7182 11.8802C78.6302 11.4002 79.5822 11.1602 80.5742 11.1602ZM80.5022 11.6402C80.0382 11.6402 79.6382 11.7842 79.3022 12.0722C78.9822 12.3442 78.7262 12.8402 78.5342 13.5602C78.3582 14.2642 78.2622 15.2642 78.2462 16.5602H82.3502C82.5102 14.8162 82.4462 13.5602 82.1582 12.7922C81.8702 12.0242 81.3182 11.6402 80.5022 11.6402Z"
                  fill="black"
                />
                <path
                  d="M70.7038 9.91216C70.1598 9.91216 69.6958 9.74416 69.3118 9.40816C68.9438 9.05616 68.7598 8.61616 68.7598 8.08816C68.7598 7.54416 68.9438 7.10416 69.3118 6.76816C69.6958 6.43216 70.1598 6.26416 70.7038 6.26416C71.2478 6.26416 71.7038 6.43216 72.0718 6.76816C72.4398 7.10416 72.6238 7.54416 72.6238 8.08816C72.6238 8.61616 72.4398 9.05616 72.0718 9.40816C71.7038 9.74416 71.2478 9.91216 70.7038 9.91216ZM67.8718 23.0642V22.8242L68.2078 22.7282C68.5278 22.6322 68.7438 22.4882 68.8558 22.2962C68.9838 22.1042 69.0478 21.8482 69.0478 21.5282V14.0162C69.0478 13.6802 68.9838 13.4322 68.8558 13.2722C68.7438 13.0962 68.5278 12.9762 68.2078 12.9122L67.8718 12.8402V12.6002L72.2638 11.1842L72.5038 11.4242L72.4318 14.8322V21.5522C72.4318 21.8722 72.4878 22.1282 72.5998 22.3202C72.7278 22.5122 72.9438 22.6562 73.2478 22.7522L73.4878 22.8242V23.0642H67.8718Z"
                  fill="black"
                />
                <path
                  d="M57.23 23.0642V22.8242L57.59 22.7282C57.91 22.6322 58.126 22.4882 58.238 22.2962C58.366 22.1042 58.43 21.8562 58.43 21.5522V14.0402C58.43 13.6882 58.366 13.4322 58.238 13.2722C58.126 13.0962 57.91 12.9762 57.59 12.9122L57.23 12.8162V12.5762L61.358 11.1842L61.598 11.4242L61.814 13.4882V13.6802C62.038 13.2322 62.326 12.8242 62.678 12.4562C63.046 12.0722 63.446 11.7602 63.878 11.5202C64.326 11.2802 64.766 11.1602 65.198 11.1602C65.806 11.1602 66.27 11.3282 66.59 11.6642C66.91 12.0002 67.07 12.4242 67.07 12.9362C67.07 13.4802 66.91 13.9042 66.59 14.2082C66.286 14.4962 65.918 14.6402 65.486 14.6402C64.814 14.6402 64.222 14.3042 63.71 13.6322L63.662 13.5842C63.502 13.3602 63.318 13.2402 63.11 13.2242C62.902 13.1922 62.71 13.2882 62.534 13.5122C62.374 13.6562 62.238 13.8322 62.126 14.0402C62.03 14.2322 61.934 14.4562 61.838 14.7122V21.4082C61.838 22.0482 62.118 22.4482 62.678 22.6082L63.446 22.8242V23.0642H57.23Z"
                  fill="black"
                />
                <path
                  d="M49.736 23.496C48.104 23.496 46.664 23.16 45.416 22.488C44.184 21.8 43.216 20.832 42.512 19.584C41.824 18.32 41.48 16.832 41.48 15.12C41.48 13.456 41.824 12 42.512 10.752C43.2 9.50399 44.192 8.53599 45.488 7.84799C46.8 7.14399 48.384 6.79199 50.24 6.79199C51.088 6.79199 51.872 6.88799 52.592 7.07999C53.328 7.27199 54.024 7.55199 54.68 7.91999L54.776 11.28H54.536L53.192 8.78399C52.984 8.38399 52.792 8.09599 52.616 7.91999C52.44 7.74399 52.216 7.60799 51.944 7.51199C51.688 7.43199 51.448 7.37599 51.224 7.34399C51.016 7.29599 50.736 7.27199 50.384 7.27199C49.392 7.27199 48.512 7.53599 47.744 8.06399C46.992 8.59199 46.408 9.43199 45.992 10.584C45.576 11.736 45.368 13.248 45.368 15.12C45.368 16.976 45.56 18.488 45.944 19.656C46.344 20.824 46.904 21.68 47.624 22.224C48.344 22.752 49.176 23.016 50.12 23.016C50.264 23.016 50.4 23.008 50.528 22.992C50.672 22.96 50.808 22.928 50.936 22.896C51.24 22.848 51.44 22.72 51.536 22.512C51.632 22.304 51.68 22.056 51.68 21.768V17.016C51.68 16.392 51.36 16.008 50.72 15.864L49.616 15.576V15.336H56.384V15.576L56.048 15.672C55.44 15.864 55.136 16.264 55.136 16.872V22.08C54.304 22.544 53.456 22.896 52.592 23.136C51.744 23.376 50.792 23.496 49.736 23.496Z"
                  fill="black"
                />
              </svg>
            </Link>
          </Container>
          <Container className="w-full bg-white rounded-xl p-6 mt-6">
            <Heading as="h1" className="text-2xl font-semibold">
              Zresetuj hasło
            </Heading>
            <Text className="text-sm text-neutral-500">
              Kliknij w przycisk poniżej aby potwierdzić zresetować hasło.
            </Text>
            <Link
              href={confirmationLink}
              className="cursor-pointer bg-emerald-600 px-5 py-3 mt-2 inline-block rounded-xl font-semibold text-white text-md"
            >
              Zresetuj hasło
            </Link>
            <Link
              href={confirmationLink}
              className="text-emerald-600 underline block mt-3 text-xs"
            >
              {confirmationLink}
            </Link>
            <Container className="text-xs m-0 text-neutral-500">
              <Text className="mb-0">
                Jeśli nie ty wysłałeś tą prośbe, możesz bezpiecznie zignorować
                tę wiadomość.
              </Text>
            </Container>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
