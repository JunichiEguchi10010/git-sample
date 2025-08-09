/**
 * script.js
 * アコーディオン制御（アクセシビリティ対応・キーボード操作・高さアニメーション）
 *
 * 保存名: script.js
 */

(function () {
    'use strict';
  
    /**
     * 高さを滑らかに開閉する関数:
     * 実際のコンテンツの高さ（scrollHeight）を計測し、inline style の maxHeight を設定する。
     */
    function openPanel(panel) {
      panel.hidden = false; // visible for measurement
      panel.setAttribute('aria-hidden', 'false');
  
      // 強制再計算してから maxHeight をセット（レイアウトシフト防止）
      const contentHeight = panel.scrollHeight;
      panel.style.maxHeight = contentHeight + 'px';
  
      // 同時にパネルの内側がある場合にパディングなどが必要なら .accordion__panel-inner が持つ
      // トランジション後は max-height を none にしておく（次回高さ変化を許容）
      const onTransitionEnd = function (e) {
        if (e.target !== panel) return;
        panel.style.maxHeight = 'none';
        panel.removeEventListener('transitionend', onTransitionEnd);
      };
      panel.addEventListener('transitionend', onTransitionEnd);
    }
  
    function closePanel(panel) {
      // 現在の高さを固定してから 0 に遷移させる
      const currentHeight = panel.scrollHeight;
      panel.style.maxHeight = currentHeight + 'px';
  
      // 必要に応じて short timeout を挟んでから 0 にする（CSS transition を発火させるため）
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.maxHeight = '0px';
          panel.setAttribute('aria-hidden', 'true');
        });
      });
  
      // transitionend で hidden にする
      const onTransitionEnd = function (e) {
        if (e.target !== panel) return;
        panel.hidden = true;
        panel.removeEventListener('transitionend', onTransitionEnd);
        // clear inline styles so next open can measure natural height
        panel.style.maxHeight = '';
      };
      panel.addEventListener('transitionend', onTransitionEnd);
    }
  
    /**
    * トグル：button と panel を受け取り開閉制御（single/multiは親の data-multi で判定）
    */
    function toggleItem(button, panel, accordion) {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const isMulti = (accordion.getAttribute('data-multi') === 'true');
  
      if (expanded) {
        button.setAttribute('aria-expanded', 'false');
        closePanel(panel);
      } else {
        // single モードなら他を閉じる
        if (!isMulti) {
          // 同じ .accordion の中の他の open を閉じる
          const others = accordion.querySelectorAll('.accordion__button[aria-expanded="true"]');
          others.forEach((otherBtn) => {
            if (otherBtn === button) return;
            const otherPanelId = otherBtn.getAttribute('aria-controls');
            const otherPanel = document.getElementById(otherPanelId);
            otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) closePanel(otherPanel);
          });
        }
        // 自分を開ける
        button.setAttribute('aria-expanded', 'true');
        openPanel(panel);
      }
    }
  
    /**
     * キーボードナビゲーション：上下 / Home / End
     */
    function onHeaderKeyDown(e) {
      const key = e.key;
      const btn = e.currentTarget;
      const accordion = btn.closest('.accordion');
      if (!accordion) return;
  
      const buttons = Array.from(accordion.querySelectorAll('.accordion__button'));
      const idx = buttons.indexOf(btn);
      if (idx === -1) return;
  
      if (key === 'ArrowDown') {
        e.preventDefault();
        const next = buttons[(idx + 1) % buttons.length];
        next.focus();
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        const prev = buttons[(idx - 1 + buttons.length) % buttons.length];
        prev.focus();
      } else if (key === 'Home') {
        e.preventDefault();
        buttons[0].focus();
      } else if (key === 'End') {
        e.preventDefault();
        buttons[buttons.length - 1].focus();
      } else if (key === 'Enter' || key === ' ') {
        // Space or Enter: toggle
        e.preventDefault();
        const panelId = btn.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        toggleItem(btn, panel, accordion);
      }
    }
  
    /**
     * 初期化
     */
    function initAccordion(root = document) {
      const accordions = Array.from(root.querySelectorAll('.accordion'));
      accordions.forEach((acc) => {
        // 初期状態の調整：panelにaria-hidden属性をつけ、hidden属性で閉じる
        const buttons = Array.from(acc.querySelectorAll('.accordion__button'));
        buttons.forEach((btn) => {
          const panelId = btn.getAttribute('aria-controls');
          const panel = document.getElementById(panelId);
          // 初期値が aria-expanded によって設定されている前提。ない場合は false をセット。
          if (btn.getAttribute('aria-expanded') !== 'true') {
            btn.setAttribute('aria-expanded', 'false');
            if (panel) {
              panel.hidden = true;
              panel.setAttribute('aria-hidden', 'true');
              panel.style.maxHeight = '0px';
            }
          } else {
            // true の場合は openPanel で高さ調整
            if (panel) {
              panel.hidden = false;
              panel.setAttribute('aria-hidden', 'false');
              openPanel(panel);
            }
          }
  
          // クリックで toggle
          btn.addEventListener('click', (e) => {
            const panel = document.getElementById(btn.getAttribute('aria-controls'));
            toggleItem(btn, panel, acc);
          });
  
          // キーボードナビゲーション
          btn.addEventListener('keydown', onHeaderKeyDown);
        });
      });
    }
  
    // DOMContentLoaded前でもdeferで呼ばれる想定なので即初期化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initAccordion());
    } else {
      initAccordion();
    }
  
  })();
  