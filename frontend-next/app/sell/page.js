"use client";
import React from "react";
import { useI18n } from "../../i18n";
import { Button, Input } from "../../ui";
import { STORAGE_KEYS } from "../../mock";

export default function SellPage(){
  const { t } = useI18n();
  const [reg, setReg] = React.useState("");
  const [km, setKm] = React.useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!reg || !km) return alert("Please fill both fields");
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || "[]");
    prev.push({ reg, km, ts: Date.now() });
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(prev));
    window.location.href = "/confirm";
  };
  return (
    <div className="bg-[var(--hero-bg)]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">{t("common.formTitle")}</h1>
        <p className="text-slate-700 mb-6">{t("common.heroSub")}</p>
        <form onSubmit={submit} className="max-w-2xl space-y-3">
          <Input value={reg} onChange={(e)=>setReg(e.target.value)} placeholder={t("common.regno")} className="h-12 rounded-full px-5" />
          <Input value={km} onChange={(e)=>setKm(e.target.value)} placeholder={t("common.mileage")} className="h-12 rounded-full px-5" />
          <Button type="submit" className="btn-orange rounded-full h-12">{t("common.start")}</Button>
        </form>
      </div>
    </div>
  );
}